import { prisma } from "@/prisma";
import { AllSeriesArgs } from "@types-app/series";
import { handleUnknownError } from "@helpers/unknownErrors";
import { seriesSelect } from "@constants/index";

const PAGE_LIMIT = 20;

const allSeries = async (_: any, args: AllSeriesArgs) => {
  const page = args.page ?? 1;

  const offset = (page - 1) * PAGE_LIMIT;

  try {
    const series = await prisma.series.findMany({
      select: seriesSelect,
      take: PAGE_LIMIT,
      skip: offset,
      orderBy: {
        createdAt: "desc",
      },
    });
    return series;
  } catch (err) {
    handleUnknownError(err, "Get All Series failed");
  }
};

export default allSeries;
