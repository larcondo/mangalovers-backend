import { Authorization } from "src/types/user";
import { GraphQLError } from "graphql";

export const verifyUserContext = (context: Authorization) => {
  if (!context.currentUser) {
    throw new GraphQLError("Not authenticated", {
      extensions: { code: "BAD_USER_INPUT" },
    });
  }
};
