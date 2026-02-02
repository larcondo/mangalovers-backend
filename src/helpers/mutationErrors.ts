import { GraphQLError } from "graphql";

export const handleMutationError = (
  err: unknown,
  logError: boolean = true,
  message: string = "Internal Server Error",
) => {
  if (logError) {
    console.log(err);
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
