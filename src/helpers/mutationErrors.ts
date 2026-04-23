import { GraphQLError } from "graphql";
import logger from "@services/logger";

export const handleMutationError = (
  err: unknown,
  logError: boolean = true,
  message: string = "Internal Server Error",
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
