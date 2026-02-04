import { prisma } from "@/prisma";
import { CreateSeriesArgs } from "@types-app/series";
import { handleMutationError } from "@/helpers/mutationErrors";
import { GraphQLError } from "graphql";
import { Authorization } from "@types-app/user";
import { verifyUserContext } from "@/helpers/auth";

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
    verifyUserContext(context);

    // Validation
    if (!isInt(args.illustratorId)) {
      throw new GraphQLError("Invalid illustrator format. Must be Integer");
    }
    if (!isInt(args.writerId)) {
      throw new GraphQLError("Invalid writerId format. Must be Integer");
    }
    if (!isInt(args.printFormatId)) {
      throw new GraphQLError("Invalid printFormatId format. Must be Integer");
    }
    if (!isInt(args.publisherId)) {
      throw new GraphQLError("Invalid publisherId format. Must be Integer");
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
    console.log(series);
    return series;
  } catch (err) {
    handleMutationError(err, true, "Crate Series Mutation failed");
  }
};

export default createSeries;
