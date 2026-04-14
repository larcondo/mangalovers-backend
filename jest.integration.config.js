import { pathsToModuleNameMapper } from "ts-jest";
import { readFileSync } from "fs";

// Parse tsconfig file with comments
const tsconfig = JSON.parse(
  readFileSync("./tsconfig.json", "utf8").replace(
    /\/\/.*|\/\*[\s\S]*?\*\//g,
    "",
  ),
);

/** @type {import("jest").Config} **/
export default {
  roots: ["<rootDir>/test"],
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  testMatch: "**/test/integration/**/*.test.ts",
  extensionsToTreatAsEsm: [".ts"],
  moduleNameMapper: pathsToModuleNameMapper(tsconfig.compilerOptions.paths, {
    prefix: "<rootDir>/",
  }),
  slowTestThreshold: 10,
};
