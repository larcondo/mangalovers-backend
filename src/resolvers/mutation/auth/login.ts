import { prisma } from "@/prisma";
import { JWTService } from "@services/jwt";
import { LoginArgs } from "@types-app/user";
import { AuthService } from "@services/auth";
import { handleMutationError } from "@helpers/mutationErrors";
import { AuthenticationError } from "@helpers/auth";

const login = async (_: any, { username, password }: LoginArgs) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user)
      throw new AuthenticationError(
        `User ${username} does't exists.`,
        "usernanme",
      );

    // Verifico si el password es válido
    const isValidPassword = await AuthService.comparePassword(
      password,
      user.password,
    );

    if (!isValidPassword) {
      throw new AuthenticationError("Wrong password. Try again.", "password");
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
