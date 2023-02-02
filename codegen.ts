
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "../huyou-server/graph/schema.graphqls",
  documents: "graphql/**/*.graphql",
  generates: {
    // "generated/": {
    //   preset: "client",
    //   plugins: [
    //     "typescript-urql",
    //   ]
    // },
    "generated/graphql.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-urql",
      ],
      config: { withHooks: true }
    },
    "./graphql.schema.json": {
      plugins: ["introspection"]
    }
  }
};

export default config;
