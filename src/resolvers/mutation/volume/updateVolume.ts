import { prisma } from "@/prisma";
import { UpdateVolumeArgs } from "@types-app/volume";
import { handleUnknownError } from "@helpers/unknownErrors";
import { Authorization } from "@types-app/user";
import { AuthService } from "@services/auth";
import { AuthorizationError } from "@helpers/auth";
import { volumeSelect } from "@constants/index";

const updateVolume = async (
  _: any,
  args: UpdateVolumeArgs,
  context: Authorization,
) => {
  try {
    // Check if the user is allowed to update
    if (!AuthService.isUserAuthorized(context))
      throw new AuthorizationError("Forbidden action");

    const volume = await prisma.volume.update({
      where: {
        id: args.id,
      },
      data: args.input,
      select: volumeSelect,
    });

    return volume;
  } catch (err) {
    handleUnknownError(err, "Update Volume Mutation failed");
  }
};

export default updateVolume;
