import { prisma } from "@/prisma";
import { CreateUserArgs } from "@types-app/user";
import { AuthService } from "@services/auth";
import { handleMutationError } from "@helpers/mutationErrors";

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
      omit: {
        password: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return user;
  } catch (err) {
    handleMutationError(err, true, "Create User failed");
  }
};

export default createUser;
