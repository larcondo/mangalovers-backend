import { GraphQLError } from "graphql";

export class UserInputError extends GraphQLError {
  constructor(message: string, field?: string) {
    super(message, {
      extensions: {
        code: "BAD_USER_INPUT",
        field,
        http: {
          status: 400,
        },
      },
    });
  }
}
