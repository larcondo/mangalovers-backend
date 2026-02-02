import { prisma } from "src/prisma";
import { GraphQLError } from "graphql";
import { JWTService } from "src/services/jwt";
import { LoginArgs } from "src/types/user";
import { AuthService } from "src/services/auth";
import { handleMutationError } from "src/helpers/mutationErrors";

const login = async (_: any, { username, password }: LoginArgs) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user)
      throw new GraphQLError(`User ${username} does't exists.`, {
        extensions: {
          code: "UNAUTHENTICATED",
          argumentName: "username",
        },
      });

    // Verifico si el password es válido
    const isValidPassword = await AuthService.comparePassword(
      password,
      user.password,
    );

    if (!isValidPassword) {
      throw new GraphQLError("Wrong password. Try again.", {
        extensions: {
          code: "UNAUTHENTICATED",
          argumentName: "password",
        },
      });
    }

    // Creo el accessToken
    const accessToken = JWTService.createAccessToken({
      username: user.username,
      email: user.email,
    });

    return { username: user.username, email: user.email, accessToken };
  } catch (err) {
    handleMutationError(err, true, "Login failed");
  }
};

export default login;
