import { prisma } from "@/prisma";
import { UpdateVolumeArgs } from "@types-app/volume";
import { handleMutationError } from "@helpers/mutationErrors";
import { Authorization } from "@types-app/user";
import { AuthService } from "@services/auth";
import { AuthorizationError } from "@helpers/auth";

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
      include: {
        series: true,
      },
      omit: {
        createdAt: true,
        updatedAt: true,
      },
    });
    return volume;
  } catch (err) {
    handleMutationError(err, true, "Update Volume Mutation failed");
  }
};

export default updateVolume;
