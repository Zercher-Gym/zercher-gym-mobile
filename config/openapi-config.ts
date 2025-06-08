import type { ConfigFile } from "@rtk-query/codegen-openapi";

const config: ConfigFile = {
  schemaFile: "./swagger.json",
  apiFile: "../store/slices/baseApiSlice",
  apiImport: "baseApi",
  outputFile: "../store/slices/apiSlice.ts",
  exportName: "api",
  filterEndpoints: /^(?!.*\badmin\b).*$/,
  hooks: true,
};

export default config;
