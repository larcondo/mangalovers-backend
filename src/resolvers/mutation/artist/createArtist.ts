import { prisma } from "@/prisma";
import { CreateArtistArgs } from "@types-app/artist";
import { Authorization } from "@types-app/user";
import { AuthService } from "@services/auth";
import { handleUnknownError } from "@helpers/unknownErrors";
import { AuthorizationError } from "@/helpers/auth";

const createArtist = async (
  _: any,
  { name }: CreateArtistArgs,
  context: Authorization,
) => {
  try {
    // Check if the user is allowed to create
    if (!AuthService.isUserAuthorized(context))
      throw new AuthorizationError("Forbidden action");

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
    handleUnknownError(err, "Create Artist Mutation failed");
  }
};

export default createArtist;
