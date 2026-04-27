import { prisma } from "@/prisma";
import { AllVolumesArgs } from "@types-app/volume";
import { handleUnknownError } from "@helpers/unknownErrors";
import { volumeSelect } from "@constants/index";
import { VOLUMES_PAGE_LIMIT } from "@config/patination";
import createPagination from "@helpers/patination";
import { UserInputError } from "@helpers/clientErrors";

const allVolumes = async (_: any, args: AllVolumesArgs) => {
  // If the page is not specified, a default value is used.
  const page = args.page ?? 1;

  try {
    if (page < 1) {
      throw new UserInputError(
        `Wrong page value: ${page}. It must be integer greater or equal than 1`,
        "page",
      );
    }

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
