import { prisma } from "src/prisma";
import { GraphQLError } from "graphql";

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
    console.log(err);
    throw new GraphQLError("Get All Artists failed");
  }
};

export default allArtists;
