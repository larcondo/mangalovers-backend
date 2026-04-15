import { prisma } from "@/prisma";
import { GraphQLError } from "graphql";
import logger from "@services/logger";
import { SearchArgs } from "@types-app/general";

const searchPublishers = async (_: any, args: SearchArgs) => {
  const { query } = args;
  const lowerCaseQuery = query.toLowerCase();

  try {
    const publishers = await prisma.publisher.findMany({
      where: {
        name: {
          contains: lowerCaseQuery,
          mode: "insensitive",
        },
      },
      omit: {
        createdAt: true,
        updatedAt: true,
      },
    });

    return publishers;
  } catch (err) {
    logger.log(err);
    throw new GraphQLError("Search Publishers failed");
  }
};

export default searchPublishers;
