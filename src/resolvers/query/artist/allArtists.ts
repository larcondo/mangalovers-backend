import { prisma } from "@/prisma";
import { GraphQLError } from "graphql";
import logger from "@services/logger";

const allArtists = async () => {
  try {
    const artists = await prisma.artist.findMany({
      orderBy: {
        createdAt: "desc",
      },
      omit: {
        createdAt: true,
        updatedAt: true,
      },
    });

    return artists;
  } catch (err) {
    logger.log(err);
    throw new GraphQLError("Get All Artists failed");
  }
};

export default allArtists;
