import { prisma } from "@/prisma";
import { CreateArtistArgs } from "@types-app/artist";
import { Authorization } from "@types-app/user";
import { verifyUserContext } from "@helpers/auth";
import { handleMutationError } from "@helpers/mutationErrors";

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
