import { Inject, Injectable, Logger } from '@nestjs/common';
import { sql } from 'kysely';
import type { FoundationRole } from 'kysely-codegen';

import { Database, type TDatabase } from '~/database/database';
import { QueryService } from '~/query/query.service';

export interface ColumnEnabledRecord {
  column_name: string;
  is_primary_key?: boolean | null;
  [key: string]: boolean | string | null | undefined;
}

@Injectable()
export class ViewService {
  private readonly logger = new Logger(ViewService.name);

  constructor(
    @Inject(Database) private readonly database: Database,
    private readonly queryService: QueryService
  ) {}

  async mutateViewsForRoles({
    columnEnabledRecords,
    name,
  }: {
    columnEnabledRecords: ColumnEnabledRecord[];
    /** The name of the root view that all these child ones are created from */
    name: string;
  }) {
    // Get the current roles in the system
    const roles = await this.database
      .withSchema('foundation')
      .selectFrom('role')
      .selectAll()
      .execute();

    const roleColumns = new Map<string, Record<string, boolean>>(
      roles.map(role => [role.slug, {}])
    );

    // Loop over the records per column and build the result per role into roleColumns
    for (const record of columnEnabledRecords) {
      for (const role of roles) {
        const atLeastOneColumnEnabledForRole = columnEnabledRecords.some(
          record => Boolean(record[role.slug])
        );
        roleColumns.set(role.slug, {
          ...roleColumns.get(role.slug),
          // See if the column is enabled for the role
          [record.column_name]: Boolean(
            // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
            record[role.slug] ||
              // Auto add primary key if any column is enabled
              (record.is_primary_key && atLeastOneColumnEnabledForRole)
          ),
        });
      }
    }

    // For now we are going to drop and recreate - create and replace has potential conflicts via column renaming
    // Possible in the future to do create and replace
    await this.database.transaction().execute(async trx => {
      const viewsToUpsert: string[] = [];
      const viewsToDelete: string[] = [];

      await Promise.all(
        roles.map(async role => {
          const viewName = ViewService.viewName({ name, role });
          // first drop the view for each role
          const columns: string[] = Object.entries(
            roleColumns.get(role.slug) ?? []
          )
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .filter(([_key, value]) => value)
            .map(([key]) => key);

          await trx
            .withSchema('foundation')
            .schema.dropView(viewName)
            .ifExists()
            .execute();

          // Then create it if there are columns
          if (columns.length > 0) {
            await trx
              .withSchema('foundation')
              .schema.createView(viewName)
              .orReplace()
              .as(
                // @ts-expect-error Build the view name
                this.database.selectFrom(name).select(columns)
              )
              .execute();
            viewsToUpsert.push(viewName);
          } else {
            viewsToDelete.push(viewName);
          }
        })
      );

      // Now that we created/deleted the views in the DB we want to create DB records of the views / columns
      // We do this to bridge the gap between postgres information tables / schemas and our application tables
      // It may be possible to do this within information_schema but in order to store
      // application meta data etc. about views we move the records into the customer scope

      // Remove all records of the views that were deleted
      await trx
        .deleteFrom('q_view')
        .where('name', 'in', viewsToDelete)
        .execute();

      const rootView = await trx
        .selectFrom('pg_views')
        .select(['schemaname', 'viewname', 'definition']) // Add other columns as needed
        .where('viewname', '=', ViewService.viewRootName({ name }))
        .where('schemaname', '=', 'foundation')
        .execute();

      const rootFields = await this.queryService.execute({
        query:
          sql`${rootView[0]?.definition.replace(';', '')} LIMIT 1;`.compile(
            trx
          ),
      });

      this.logger.log({ rootFields: rootFields.fields });

      // Get the info we need to upsert the views that were updated or created
      const viewsResults = await Promise.all(
        viewsToUpsert.map(view =>
          this.queryService.execute({
            query: sql`select * from ${view} limit 1;`.compile(trx),
          })
        )
      );

      // Upsert the records into our tables
      // const viewColumns = viewsResults.flatMap((result, viewIndex) =>
      //   result.fields.map(field => {
      //     return {
      //       ...field,
      //       view: viewsToUpsert[i],
      //     };
      //   })
      // );
    });

    const allViews = roles.map(role => ViewService.viewName({ role, name }));

    const columnResults = Promise.all(
      allViews.map(view =>
        this.queryService.execute({
          query: sql`select * from ${view} limit 1;`.compile(this.database),
        })
      )
    );

    // await this.database.transaction().execute(async trx => {
    return 'ok';
  }

  async columnsByRoleView({ name }: { name: string }) {
    // Get the current roles in the system
    const roles = await this.database
      .withSchema('foundation')
      .selectFrom('role')
      .selectAll()
      .execute();

    // Try and find views for those roles if they exist
    const allRoleViews = await Promise.allSettled(
      roles.map(
        async role =>
          await this.database
            .withSchema('foundation')
            .selectFrom(ViewService.viewName({ name, role }))
            .selectAll()
            .execute()
      )
    );

    // Get the superset of columns based on the master view of this data set/model
    const masterView = await this.database
      .withSchema('foundation')
      .selectFrom('schema_columns as view')
      // @ts-expect-error IDK why this is throwing but it works fine
      .select([
        'view.table_name',
        'view.column_name',
        'view.data_type',
        'view.character_maximum_length',
        'view.column_default',
        'view.is_updatable',
        'view.is_generated',
        'view.generation_expression',
        'source_table.is_nullable',
        'source_table.is_primary_key',
        'source_table.is_unique',
        'source_table.foreign_table',
      ])
      .leftJoin('schema_columns as source_table', join =>
        join
          .onRef('view.column_name', '=', 'source_table.column_name')
          .on('source_table.table_name', '=', name)
      )
      .where('view.table_name', '=', name)
      .execute();

    // Create a map for easy access of pssoible role to possible view (if it exists)
    const roleViewMap = new Map(
      roles.map((role, index) => [role.slug, allRoleViews[index]])
    );

    // Merge the superset records from the master view so that we get a column per role of whether a view exists for the role
    // and has the column referenced in the master view
    const merged = masterView.map(row => ({
      ...row,
      // eslint-disable-next-line unicorn/no-array-reduce
      ...roles.reduce((accumulator, role) => {
        const viewResult = roleViewMap.get(role.slug);
        return {
          ...accumulator,
          [role.slug]:
            viewResult?.status === 'fulfilled'
              ? // @ts-expect-error Cant type the column name since who knows if it exists or not
                Boolean(viewResult.value.some(v => Boolean(v[row.column_name])))
              : false,
        };
      }, {}),
    }));

    return merged;
  }

  /** Deterministic name of the view based on the role and source view */
  private static viewName({
    name,
    role,
  }: {
    name: string;
    role: FoundationRole;
  }): keyof TDatabase {
    return `q_${name}__${role.slug}` as keyof TDatabase;
  }

  /** Deterministic name of the root view that role vq_view's are created from */
  private static viewRootName({ name }: { name: string }): keyof TDatabase {
    return `q_${name}` as keyof TDatabase;
  }
}
