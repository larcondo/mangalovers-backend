import "dotenv/config";
import { StringValue } from "ms";
import { EnvironmentVars, Config } from "src/types/config";

const DEFAULT_PORT = 4000;

type ExpiresInOpt = number | StringValue;

const readEnv = (): EnvironmentVars => {
  return {
    PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : DEFAULT_PORT,
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN as ExpiresInOpt,
    JWT_ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET,
  };
};

const getConfig = (config: EnvironmentVars): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Env variable ${key} required!`);
    }
  }
  console.log("[Environment variables] Loaded successfuly!");
  return config as Config;
};

const config = getConfig(readEnv());

export default config;
