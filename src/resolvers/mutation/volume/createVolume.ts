import { prisma } from "@/prisma";
import { CreateVolumeArgs } from "@types-app/volume";
import { handleUnknownError } from "@helpers/unknownErrors";
import { Authorization } from "@types-app/user";
import { AuthorizationError } from "@helpers/auth";
import { AuthService } from "@services/auth";
import { UserInputError } from "@helpers/clientErrors";
import { volumeSelect } from "@constants/index";

const createVolume = async (
  _: any,
  args: CreateVolumeArgs,
  context: Authorization,
) => {
  try {
    // Check if the user is allowed to create
    if (!AuthService.isUserAuthorized(context))
      throw new AuthorizationError("Forbidden action");

    const series = await prisma.series.count({
      where: {
        id: args.seriesId,
      },
    });

    if (!series)
      throw new UserInputError("Series id doesn't exist.", "seriesId");

    const volume = await prisma.volume.create({
      data: {
        number: args.number,
        seriesId: args.seriesId,
        title: args.title,
        synopsis: args.synopsis,
        urlCover: args.urlCover,
        publicationDate: args.publicationDate,
      },
      select: volumeSelect,
    });

    return volume;
  } catch (err) {
    handleUnknownError(err, "Create Volume Mutation failed");
  }
};

export default createVolume;
