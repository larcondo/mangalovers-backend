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
  testMatch: "**/test/resolvers/**/*.test.ts",
  extensionsToTreatAsEsm: [".ts"],
  moduleNameMapper: pathsToModuleNameMapper(tsconfig.compilerOptions.paths, {
    prefix: "<rootDir>/",
  }),
  setupFilesAfterEnv: ["<rootDir>/test/jest.setup.ts"],
  slowTestThreshold: 10,
};
