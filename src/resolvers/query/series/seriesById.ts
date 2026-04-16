import { prisma } from "@/prisma";
import { SeriesByIdArgs } from "@types-app/series";
import { UserInputError } from "@helpers/clientErrors";
import { seriesSelect } from "@constants/index";
import logger from "@services/logger";
import { GraphQLError } from "graphql";

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
    logger.log(err);
    if (err instanceof GraphQLError) {
      throw err;
    } else {
      throw new GraphQLError("Get Series by Id failed");
    }
  }
};

export default seriesById;
