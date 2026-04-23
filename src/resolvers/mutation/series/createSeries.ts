import { prisma } from "@/prisma";
import { CreateSeriesArgs } from "@types-app/series";
import { handleMutationError } from "@helpers/mutationErrors";
import { Authorization } from "@types-app/user";
import { AuthorizationError } from "@helpers/auth";
import { AuthService } from "@services/auth";
import { UserInputError } from "@helpers/clientErrors";
import logger from "@services/logger";

const isInt = (value: string): boolean => {
  return !isNaN(parseInt(value, 10)) && /^[0-9]+$/.test(value);
};

const createSeries = async (
  _: any,
  args: CreateSeriesArgs,
  context: Authorization,
) => {
  try {
    // Check if the user is allowed to create
    if (!AuthService.isUserAuthorized(context))
      throw new AuthorizationError("Forbidden action");

    // Validation
    if (!isInt(args.illustratorId)) {
      throw new UserInputError(
        "Invalid illustratorId format. Must be Integer",
        "illustratorId",
      );
    }
    if (!isInt(args.writerId)) {
      throw new UserInputError(
        "Invalid writerId format. Must be Integer",
        "writerId",
      );
    }
    if (!isInt(args.printFormatId)) {
      throw new UserInputError(
        "Invalid printFormatId format. Must be Integer",
        "printFormatId",
      );
    }
    if (!isInt(args.publisherId)) {
      throw new UserInputError(
        "Invalid publisherId format. Must be Integer",
        "publisherId",
      );
    }

    const illustratorId = parseInt(args.illustratorId, 10);
    const writerId = parseInt(args.writerId, 10);
    const printFormatId = parseInt(args.printFormatId, 10);
    const publisherId = parseInt(args.publisherId, 10);

    const series = await prisma.series.create({
      data: {
        name: args.name,
        illustratorId,
        writerId,
        printFormatId,
        publisherId,
        isSingleVolume: args.isSingleVolume,
        urlCover: args.urlCover,
      },
      include: {
        illustrator: true,
        writer: true,
        printFormat: true,
        publisher: true,
      },
      omit: {
        createdAt: true,
        updatedAt: true,
      },
    });
    logger.log(series);
    return series;
  } catch (err) {
    handleMutationError(err, true, "Create Series Mutation failed");
  }
};

export default createSeries;
