import { prisma } from "@/prisma";
import { SearchArgs } from "@types-app/general";
import { seriesSelect } from "@constants/index";
import { handleUnknownError } from "@helpers/unknownErrors";

const searchSeries = async (_: any, args: SearchArgs) => {
  const { query } = args;
  const lowerCaseQuery = query.toLowerCase();

  try {
    const series = await prisma.series.findMany({
      where: {
        name: {
          contains: lowerCaseQuery,
          mode: "insensitive",
        },
      },
      select: seriesSelect,
    });

    return series;
  } catch (err) {
    handleUnknownError(err, "Search Series failed");
  }
};

export default searchSeries;
