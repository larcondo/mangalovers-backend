import { prisma } from "@/prisma";
import { GraphQLError } from "graphql";
import logger from "@services/logger";
import { SearchArgs } from "@types-app/general";

const searchArtists = async (_: any, args: SearchArgs) => {
  const { query } = args;
  const lowerCaseQuery = query.toLowerCase();

  try {
    const artists = await prisma.artist.findMany({
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

    return artists;
  } catch (err) {
    logger.log(err);
    throw new GraphQLError("Search Artists failed");
  }
};

export default searchArtists;
