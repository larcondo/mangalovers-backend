import { prisma } from "@/prisma";
import { VolumesBySeriesArgs } from "@types-app/volume";
import { volumeSelect } from "@constants/index";
import { handleUnknownError } from "@/helpers/unknownErrors";

const volumesBySeries = async (_: any, args: VolumesBySeriesArgs) => {
  const { seriesId } = args;

  try {
    const volumes = await prisma.volume.findMany({
      where: { seriesId },
      select: volumeSelect,
      orderBy: {
        number: "asc",
      },
    });

    return volumes;
  } catch (err) {
    handleUnknownError(err, "Get Volumes by Series failed");
  }
};

export default volumesBySeries;
