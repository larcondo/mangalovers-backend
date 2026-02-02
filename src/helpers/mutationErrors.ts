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
    throw new GraphQLError(err.message, {
      extensions: { code: err.extensions.code },
    });
  } else {
    throw new GraphQLError(message);
  }
};
