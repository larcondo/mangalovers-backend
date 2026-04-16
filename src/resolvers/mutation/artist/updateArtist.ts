import { prisma } from "@/prisma";
import { UpdateArtistArgs } from "@types-app/artist";
import { handleUnknownError } from "@helpers/unknownErrors";
import { Authorization } from "@types-app/user";
import { AuthService } from "@services/auth";
import { AuthorizationError } from "@helpers/auth";
import { parseSingleIntId } from "@utils/parsers";

const updateArtist = async (
  _: any,
  args: UpdateArtistArgs,
  context: Authorization,
) => {
  try {
    // Check if the user is allowed to update
    if (!AuthService.isUserAuthorized(context))
      throw new AuthorizationError("Forbidden action");

    const artist = await prisma.artist.update({
      where: {
        id: parseSingleIntId(args.id, "artistId"),
      },
      data: args.input,
      omit: {
        createdAt: true,
        updatedAt: true,
      },
    });

    return artist;
  } catch (err) {
    handleUnknownError(err, "Update Artist Mutation failed");
  }
};

export default updateArtist;
