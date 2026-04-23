import { UserInputError } from "@/helpers/clientErrors";
import { prisma } from "@/prisma";
import { VolumeByIdArgs } from "@types-app/volume";
import { volumeSelect } from "@constants/index";
import { handleUnknownError } from "@helpers/unknownErrors";

const volumeById = async (_: any, args: VolumeByIdArgs) => {
  const { id } = args;

  try {
    const volume = await prisma.volume.findUnique({
      where: { id },
      select: volumeSelect,
    });

    if (!volume)
      throw new UserInputError(
        `The volume with id ${id} does not exist.`,
        "id",
      );

    return volume;
  } catch (err) {
    handleUnknownError(err, "Get Volume by Id failed");
  }
};

export default volumeById;
