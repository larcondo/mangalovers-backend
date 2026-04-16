import { prisma } from "@/prisma";
import { AllSeriesArgs } from "@types-app/series";
import { handleUnknownError } from "@helpers/unknownErrors";

const PAGE_LIMIT = 20;

const allSeries = async (_: any, args: AllSeriesArgs) => {
  const page = args.page ?? 1;

  const offset = (page - 1) * PAGE_LIMIT;

  try {
    const series = await prisma.series.findMany({
      include: {
        illustrator: true,
        writer: true,
        printFormat: true,
        publisher: true,
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
    return series;
  } catch (err) {
    handleUnknownError(err, "Get All Series failed");
  }
};

export default allSeries;
