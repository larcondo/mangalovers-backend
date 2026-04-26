declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      TEST_DATABASE_URL: string;
      JWT_ACCESS_TOKEN_SECRET: string;
      JWT_EXPIRES_IN: string;
      PORT: string;
      UPLOADS_FOLDER_NAME: string;
    }
  }
}

export {};
