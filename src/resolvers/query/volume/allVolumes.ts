import { prisma } from "@/prisma";
import { AllVolumesArgs } from "@types-app/volume";
import { handleUnknownError } from "@helpers/unknownErrors";
import { volumeSelect } from "@constants/index";
import { VOLUMES_PAGE_LIMIT } from "@config/patination";
import createPagination from "@helpers/patination";

const allVolumes = async (_: any, args: AllVolumesArgs) => {
  // If the page is not specified, a default value is used.
  const page = args.page ?? 1;

  try {
    const volumeQty = await prisma.volume.count();

    const pagination = createPagination(page, volumeQty, VOLUMES_PAGE_LIMIT);

    const volumes = await prisma.volume.findMany({
      select: volumeSelect,
      take: VOLUMES_PAGE_LIMIT,
      skip: pagination.offset,
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      pagination,
      volumes,
    };
  } catch (err) {
    handleUnknownError(err, "Get All Volumes failed");
  }
};

export default allVolumes;
