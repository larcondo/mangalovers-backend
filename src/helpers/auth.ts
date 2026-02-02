import { Authorization } from "src/types/user";
import { GraphQLError } from "graphql";

export const verifyUserContext = (context: Authorization) => {
  if (!context.currentUser) {
    throw new AuthorizationError("Forbidden action");
  }
};

// Error Personalizado de Autenticación
export class AuthenticationError extends GraphQLError {
  constructor(message: string, field?: string) {
    super(message, {
      extensions: {
        code: "UNAUTHENTICATED",
        field,
        http: {
          status: 401,
        },
      },
    });
  }
}

export class AuthorizationError extends GraphQLError {
  constructor(message: string) {
    super(message, {
      extensions: {
        code: "FORBIDDEN",
        http: {
          status: 403,
        },
      },
    });
  }
}
