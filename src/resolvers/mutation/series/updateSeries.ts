import { prisma } from "@/prisma";
import { UpdateSeriesArgs } from "@types-app/series";
import { handleUnknownError } from "@helpers/unknownErrors";
import { parseIdsToInt } from "@utils/parsers";
import { Authorization } from "@types-app/user";
import { AuthService } from "@services/auth";
import { AuthorizationError } from "@helpers/auth";
import { seriesSelect } from "@constants/index";

const updateSeries = async (
  _: any,
  args: UpdateSeriesArgs,
  context: Authorization,
) => {
  try {
    // Check if the user is allowed to update
    if (!AuthService.isUserAuthorized(context))
      throw new AuthorizationError("Forbidden action");

    // Convert these fields to numbers (throw error if fail)
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
      select: seriesSelect,
    });
    return series;
  } catch (err) {
    handleUnknownError(err, "Update Series Mutation failed");
  }
};

export default updateSeries;
