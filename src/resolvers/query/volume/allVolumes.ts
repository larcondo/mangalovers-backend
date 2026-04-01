import { prisma } from "@/prisma";
import { AllVolumesArgs } from "@types-app/volume";
import { GraphQLError } from "graphql";
import logger from "@services/logger";

const PAGE_LIMIT = 20;

const allVolumes = async (_: any, args: AllVolumesArgs) => {
  const page = args.page ?? 1;
  const offset = (page - 1) * PAGE_LIMIT;

  try {
    const volumes = await prisma.volume.findMany({
      include: {
        series: true,
      },
      take: PAGE_LIMIT,
      skip: offset,
      orderBy: {
        createdAt: "desc",
      },
      omit: {
        createdAt: true,
        updatedAt: true,
      },
    });
    return volumes;
  } catch (err) {
    logger.log(err);
    throw new GraphQLError("Get All Volumes failed");
  }
};

export default allVolumes;
