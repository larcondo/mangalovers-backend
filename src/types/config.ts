import { StringValue } from "ms";

export interface EnvironmentVars {
  PORT: number | undefined;
  DATABASE_URL: string | undefined;
  TEST_DATABASE_URL: string | undefined;
  JWT_EXPIRES_IN: number | StringValue | undefined;
  JWT_ACCESS_TOKEN_SECRET: string | undefined;
  UPLOADS_FOLDER_NAME: string | undefined;
}

export interface Config {
  PORT: number;
  DATABASE_URL: string;
  TEST_DATABASE_URL: string;
  JWT_EXPIRES_IN: number | StringValue;
  JWT_ACCESS_TOKEN_SECRET: string;
  UPLOADS_FOLDER_NAME: string;
}
