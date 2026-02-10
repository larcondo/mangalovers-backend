import { prisma } from "@/prisma";
import { UpdateSeriesArgs } from "@types-app/series";
import { handleMutationError } from "@helpers/mutationErrors";
import { parseIdsToInt } from "@/utils/parsers";

const updateSeries = async (_: any, args: UpdateSeriesArgs) => {
  try {
    // Convert these fields to numbers
    const parsedArgs = parseIdsToInt(args.input, [
      "writerId",
      "illustratorId",
      "publisherId",
      "printFormatId",
    ]);

    const series = await prisma.series.update({
      where: {
        id: args.id,
      },
      data: parsedArgs,
      include: {
        writer: true,
        illustrator: true,
        printFormat: true,
        publisher: true,
      },
      omit: {
        createdAt: true,
        updatedAt: true,
      },
    });
    return series;
  } catch (err) {
    handleMutationError(err, true, "Update Series Mutation failed");
  }
};

export default updateSeries;

/*
{
  iId: string | undefined,
  wId: string | undefined
}
{
  iId: number | undefined,
  wId: number | undefined
}

*/
