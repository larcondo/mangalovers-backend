import { prisma } from "src/prisma";
import { GraphQLError } from "graphql";
import { CreateArtistArgs } from "src/types/artist";

const createArtist = async (_: any, { name }: CreateArtistArgs) => {
  try {
    const artist = await prisma.artist.create({
      data: {
        name,
      },
    });
    return artist;
  } catch (err) {
    console.log(err);
    throw new GraphQLError("Create Artist Mutation failed");
  }
};

export default createArtist;
