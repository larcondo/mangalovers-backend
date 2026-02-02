import { StringValue } from "ms";

export interface EnvironmentVars {
  PORT: number | undefined;
  DATABASE_URL: string | undefined;
  JWT_EXPIRES_IN: number | StringValue | undefined;
  JWT_ACCESS_TOKEN_SECRET: string | undefined;
}

export interface Config {
  PORT: number;
  DATABASE_URL: string;
  JWT_EXPIRES_IN: number | StringValue;
  JWT_ACCESS_TOKEN_SECRET: string;
}
