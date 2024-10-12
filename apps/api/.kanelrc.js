const { join } = require('path');
const { recase } = require('@kristiandupont/recase');
const { makeKyselyHook } = require('kanel-kysely');
// const {
//   makeGenerateZodSchemas,
//   defaultGetZodSchemaMetadata,
//   defaultGetZodIdentifierMetadata,
//   defaultZodTypeMap,
// } = require('kanel-zod'); Doewsnt seem to work - naming seems wrong
const { tryParse } = require('tagged-comment-parser');
const { generateIndexFile } = require('kanel');

const outputPath = '../../packages/postgres-types/src';
const toPascalCase = recase('snake', 'pascal');

// const generateZodSchemas = makeGenerateZodSchemas({
//   getZodSchemaMetadata: defaultGetZodSchemaMetadata,
//   getZodIdentifierMetadata: defaultGetZodIdentifierMetadata,
//   zodTypeMap: {
//     ...defaultZodTypeMap,
//   },
//   castToSchema: true,
// });

/** @type {import('kanel').Config} */
module.exports = {
  connection: {
    host: 'localhost',
    user: 'postgres',
    password: 'password',
    database: 'odigos',
  },
  schemas: ['public', 'tenant_base_org'],
  typeFilter: pgType => !/^knex_migrations/.test(pgType.name),
  preDeleteOutputFolder: true,
  outputPath,
  preRenderHooks: [makeKyselyHook(), generateIndexFile],
  getMetadata: (details, generateFor) => {
    const { comment: strippedComment } = tryParse(details.comment);
    const isAgentNoun = ['initializer', 'mutator'].includes(generateFor);

    const relationComment = isAgentNoun
      ? `Represents the ${generateFor} for the ${details.kind} ${details.schemaName}.${details.name}`
      : `Represents the ${details.kind} ${details.schemaName}.${details.name}`;

    const suffix = isAgentNoun ? `_${generateFor}` : '';

    return {
      name: toPascalCase(details.name + suffix),
      comment: [
        ...(details.schemaName === 'base_org'
          ? ['ORGANIZATION: ']
          : ['PUBLIC: ']),
        relationComment,
        ...(strippedComment ? [strippedComment] : []),
      ],
      path: join(
        outputPath,
        toPascalCase(details.schemaName),
        toPascalCase(details.name)
      ),
    };
  },
  getPropertyMetadata: (property, _details, generateFor) => {
    const { comment: strippedComment } = tryParse(property.comment);

    return {
      name: property.name,
      comment: [
        `Database type: ${property.expandedType}`,
        ...(generateFor === 'initializer' && property.defaultValue
          ? [`Default value: ${property.defaultValue}`]
          : []),
        ...(strippedComment ? [strippedComment] : []),
      ],
    };
  },
};
