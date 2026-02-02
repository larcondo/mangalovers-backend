import { prisma } from "src/prisma";
import { GraphQLError } from "graphql";
import { CreateUserArgs } from "src/types/user";

const createUser = async (
  _: any,
  { username, password, email }: CreateUserArgs,
) => {
  try {
    const user = await prisma.user.create({
      data: {
        username,
        password,
        email,
      },
    });
    return user;
  } catch (err) {
    console.log(err);
    throw new GraphQLError("Create User failed");
  }
};

export default createUser;
