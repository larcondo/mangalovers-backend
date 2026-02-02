import { prisma } from "src/prisma";
import { CreateArtistArgs } from "src/types/artist";
import { Authorization } from "src/types/user";
import { verifyUserContext } from "src/helpers/auth";
import { handleMutationError } from "src/helpers/mutationErrors";

const createArtist = async (
  _: any,
  { name }: CreateArtistArgs,
  context: Authorization,
) => {
  try {
    // Check if the user is allowed to create
    verifyUserContext(context);

    const artist = await prisma.artist.create({
      data: {
        name,
      },
      omit: {
        createdAt: true,
        updatedAt: true,
      },
    });
    return artist;
  } catch (err) {
    handleMutationError(err, true, "Create Artist Mutation failed");
  }
};

export default createArtist;
