import { prisma } from "@/prisma";
import { AllSeriesArgs } from "@types-app/series";
import { handleUnknownError } from "@helpers/unknownErrors";
import { seriesSelect } from "@constants/index";
import { SERIES_PAGE_LIMIT } from "@config/patination";
import createPagination from "@helpers/patination";

const allSeries = async (_: any, args: AllSeriesArgs) => {
  // If the page is not specified, a default value is used.
  const page = args.page ?? 1;

  try {
    const seriesQty = await prisma.series.count();

    const pagination = createPagination(page, seriesQty, SERIES_PAGE_LIMIT);

    const series = await prisma.series.findMany({
      select: seriesSelect,
      take: SERIES_PAGE_LIMIT,
      skip: pagination.offset,
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      pagination,
      series,
    };
  } catch (err) {
    handleUnknownError(err, "Get All Series failed");
  }
};

export default allSeries;
