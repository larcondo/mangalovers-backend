import { prisma } from "src/prisma";
import { GraphQLError } from "graphql";
import { JWTService } from "src/services/jwt";
import { LoginArgs } from "src/types/user";

const login = async (_: any, { username, password }: LoginArgs) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) throw new GraphQLError(`User ${username} does't exists.`);

    if (user.password !== password) {
      throw new GraphQLError("Wrong password. Try again.");
    }

    const accessToken = JWTService.createAccessToken({
      username: user.username,
      email: user.email,
    });

    return { username: user.username, email: user.email, accessToken };
  } catch (err) {
    console.log(err);
    if (err instanceof GraphQLError) {
      throw new GraphQLError(err.message, {
        extensions: {
          code: "BAD_USER_INPUT",
        },
      });
    } else {
      throw new GraphQLError("Login failed");
    }
  }
};

export default login;
