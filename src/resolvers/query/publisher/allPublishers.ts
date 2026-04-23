import { prisma } from "@/prisma";
import { GraphQLError } from "graphql";
import logger from "@services/logger";

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
    logger.log(err);
    throw new GraphQLError("Get All Publishers failed");
  }
};

export default allPublishers;
