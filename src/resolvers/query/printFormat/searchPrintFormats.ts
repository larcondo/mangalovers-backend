import { prisma } from "@/prisma";
import { GraphQLError } from "graphql";
import logger from "@services/logger";
import { SearchArgs } from "@types-app/general";

const searchPrintFormats = async (_: any, args: SearchArgs) => {
  const { query } = args;
  const lowerCaseQuery = query.toLowerCase();

  try {
    const printFormats = await prisma.printFormat.findMany({
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

    return printFormats;
  } catch (err) {
    logger.log(err);
    throw new GraphQLError("Search PrintFormats failed");
  }
};

export default searchPrintFormats;
