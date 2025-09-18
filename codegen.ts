import type { CodegenConfig } from "@graphql-codegen/cli";

const GRAPHQL_URL =
  process.env.NEXT_PUBLIC_NHOST_GRAPHQL_URL || "https://local.hasura.local.nhost.run/v1/graphql";

const headers: Record<string, string> = {};
// Default local admin secret if none provided, for developer ergonomics only
if (GRAPHQL_URL.includes("local.") && !process.env.NHOST_ADMIN_SECRET) {
  headers["x-hasura-admin-secret"] = "nhost-admin-secret";
} else if (process.env.NHOST_ADMIN_SECRET) {
  headers["x-hasura-admin-secret"] = process.env.NHOST_ADMIN_SECRET as string;
}

const config: CodegenConfig = {
  schema: [
    {
      [GRAPHQL_URL]: { headers },
    },
  ],
  documents: ["src/lib/graphql/**/*.graphql"],
  ignoreNoDocuments: true,
  generates: {
    "./src/lib/graphql/__generated__/graphql.ts": {
      documents: ["src/lib/graphql/**/*.graphql"],
      plugins: ["typescript", "typescript-operations", "typescript-react-query"],
      config: {
        scalars: {
          UUID: "string",
          uuid: "string",
          timestamptz: "string",
          jsonb: "Record<string, any>",
          bigint: "number",
          bytea: "Buffer",
          citext: "string",
        },
        exposeQueryKeys: true,
        exposeFetcher: true,
        fetcher: {
          func: "../queryHooks#useAuthenticatedFetcher",
          isReactHook: true,
        },
        useTypeImports: false,
        reactQueryVersion: 5,
      },
    },
    "./schema.graphql": {
      plugins: ["schema-ast"],
      config: { includeDirectives: true },
    },
  },
};

export default config;
