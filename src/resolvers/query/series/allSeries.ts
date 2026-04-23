import { prisma } from "@/prisma";
import { AllSeriesArgs } from "@types-app/series";
import { handleUnknownError } from "@helpers/unknownErrors";
import { seriesSelect } from "@constants/index";
import { SERIES_PAGE_LIMIT } from "@config/patination";
import createPagination from "@helpers/patination";
import { UserInputError } from "@helpers/clientErrors";

const allSeries = async (_: any, args: AllSeriesArgs) => {
  // If the page is not specified, a default value is used.
  const page = args.page ?? 1;

  try {
    if (page < 1) {
      throw new UserInputError(
        `Wrong page value: ${page}. It must be integer greater or equal than 1`,
        "page",
      );
    }

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
