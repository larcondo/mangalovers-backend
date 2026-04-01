import { prisma } from "@/prisma";
import { CreateVolumeArgs } from "@types-app/volume";
import { handleMutationError } from "@helpers/mutationErrors";
import { Authorization } from "@types-app/user";
import { AuthorizationError } from "@helpers/auth";
import { AuthService } from "@services/auth";
import { UserInputError } from "@helpers/clientErrors";

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
      include: {
        series: true,
      },
    });
    return volume;
  } catch (err) {
    handleMutationError(err, true, "Create Volume Mutation failed");
  }
};

export default createVolume;
