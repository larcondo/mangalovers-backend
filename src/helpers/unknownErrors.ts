import { GraphQLError } from "graphql";
import logger from "@services/logger";

export const handleUnknownError = (
  err: unknown,
  message: string = "Internal Server Error",
  logError: boolean = true,
) => {
  if (logError) {
    logger.log(err);
  }

  if (err instanceof GraphQLError) {
    throw err;
  } else {
    throw new GraphQLError(message, {
      extensions: {
        code: "INTERNAL_SERVER_ERROR",
      },
    });
  }
};
