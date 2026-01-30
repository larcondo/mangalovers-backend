import { prisma } from "src/prisma";
import { GraphQLError } from "graphql";

const allPublishers = async () => {
  try {
    const publishers = await prisma.publisher.findMany({
      orderBy: {
        createdAt: "desc",
      },
      omit: {
        createdAt: true,
        updatedAt: true,
      },
    });
    return publishers;
  } catch (err) {
    console.log(err);
    throw new GraphQLError("Get All Publishers failed");
  }
};

export default allPublishers;
