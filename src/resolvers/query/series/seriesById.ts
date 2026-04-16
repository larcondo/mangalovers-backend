import { prisma } from "@/prisma";
import { SeriesByIdArgs } from "@types-app/series";
import { UserInputError } from "@helpers/clientErrors";
import { seriesSelect } from "@constants/index";
import { handleUnknownError } from "@helpers/unknownErrors";

const seriesById = async (_: any, args: SeriesByIdArgs) => {
  const { id } = args;

  try {
    const series = await prisma.series.findUnique({
      where: { id },
      select: seriesSelect,
    });

    if (!series)
      throw new UserInputError(`The series with id ${id} does not exist`, "id");

    return series;
  } catch (err) {
    handleUnknownError(err, "Get Series by Id failed");
  }
};

export default seriesById;
