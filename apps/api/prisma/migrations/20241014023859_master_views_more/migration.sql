-- Master Views for each table
DO $$
DECLARE
    schema_name TEXT;
    table_name TEXT;
    view_sql TEXT;
BEGIN
    -- Loop through a list of schemas
    FOR schema_name IN 
        SELECT s.schema_name
        FROM information_schema.schemata s
        WHERE s.schema_name IN ('foundation') -- TODO:  add more schema names
    LOOP
        -- Loop through a list of tables
        FOR table_name IN
            SELECT t.table_name
            FROM information_schema.tables t
            WHERE t.table_schema = schema_name  -- Get tables for the current schema
              AND t.table_name IN ('opportunity', 'deal', 'property' )  -- Specify your table names
        LOOP
            -- Construct the dynamic SQL for creating a view in each schema for each table
            view_sql := 'CREATE OR REPLACE VIEW ' || schema_name || '.' || 'q_' || table_name || ' AS SELECT * FROM ' || schema_name || '.' || table_name;

            EXECUTE view_sql;
        END LOOP;
    END LOOP;
END $$;

-- Schema Columns (including views)
DO $$
DECLARE
    schema_name TEXT;
    view_sql TEXT;
BEGIN
    -- Loop through each schema in the database
    FOR schema_name IN 
        SELECT s.schema_name
        FROM information_schema.schemata s
        WHERE s.schema_name IN ('foundation') -- TODO: add more schema names
    LOOP
        -- Construct the SQL to create the view for each schema
        view_sql := 'CREATE OR REPLACE VIEW ' || schema_name || '.schema_columns AS ' ||
                    'SELECT ' ||
                    'cols.table_name, ' ||
                    'cols.column_name, ' ||
                    'cols.data_type, ' ||
                    'cols.is_nullable, ' ||
                    'cols.character_maximum_length, ' ||
                    'cols.column_default, ' ||
                    'cols.is_updatable, ' ||
                    'cols.is_generated, ' ||
                    'cols.generation_expression, ' ||
                    'CASE WHEN tables.table_type = ''VIEW'' THEN ''VIEW'' ELSE ''TABLE'' END AS object_type, ' ||
                    'BOOL_OR(CASE WHEN cons.contype = ''p'' THEN true ELSE false END) AS is_primary_key, ' ||
                    'BOOL_OR(CASE WHEN cons.contype IN (''p'', ''u'') THEN true ELSE false END) AS is_unique, ' ||
                    'STRING_AGG(DISTINCT fk_table.relname, '', '' ORDER BY fk_table.relname) AS foreign_table ' ||
                    'FROM information_schema.columns cols ' ||
                    'JOIN information_schema.tables tables ON cols.table_name = tables.table_name AND cols.table_schema = tables.table_schema ' ||
                    'LEFT JOIN pg_class pgc ON pgc.relname = cols.table_name ' ||
                    'LEFT JOIN pg_constraint cons ON cons.conrelid = pgc.oid ' ||
                    'LEFT JOIN pg_class fk_table ON fk_table.oid = cons.confrelid ' ||
                    'LEFT JOIN pg_attribute attr ON attr.attrelid = cons.conrelid AND attr.attnum = ANY(cons.conkey) ' ||
                    'WHERE cols.table_schema = ''' || schema_name || ''' ' ||
                    'AND (cols.column_name = attr.attname OR attr.attname IS NULL) ' ||
                    'GROUP BY ' ||
                    'cols.table_name, cols.column_name, cols.data_type, cols.is_nullable, ' ||
                    'cols.character_maximum_length, cols.column_default, cols.is_updatable, ' ||
                    'cols.is_generated, cols.generation_expression, tables.table_type';

        EXECUTE view_sql;
    END LOOP;
END $$;