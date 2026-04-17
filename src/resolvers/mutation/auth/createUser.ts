import { prisma } from "@/prisma";
import { CreateUserArgs } from "@types-app/user";
import { AuthService } from "@services/auth";
import { handleUnknownError } from "@helpers/unknownErrors";

const createUser = async (
  _: any,
  { username, password, email }: CreateUserArgs,
) => {
  try {
    const hashedPassword = await AuthService.hashPassword(password);

    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        email,
      },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
      },
    });

    return user;
  } catch (err) {
    handleUnknownError(err, "Create User failed");
  }
};

export default createUser;
