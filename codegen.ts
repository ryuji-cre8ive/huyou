import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: './graphql/schema.graphql',
  documents: 'graphql/**/*.graphql',
  generates: {
    'generated/graphql.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-urql'],
      config: { withHooks: true },
    },
    'generated/server.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-graphql-request'],
      config: { withHooks: true },
    },
    './graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
}

export default config
