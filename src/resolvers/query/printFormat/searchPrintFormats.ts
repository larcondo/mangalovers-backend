import { prisma } from "@/prisma";
import { SearchArgs } from "@types-app/general";
import { handleUnknownError } from "@helpers/unknownErrors";
import { printFormatSelect } from "@constants/index";

const searchPrintFormats = async (_: any, args: SearchArgs) => {
  const { query } = args;
  const lowerCaseQuery = query.toLowerCase();

  try {
    const printFormats = await prisma.printFormat.findMany({
      where: {
        name: {
          contains: lowerCaseQuery,
          mode: "insensitive",
        },
      },
      select: printFormatSelect,
    });

    return printFormats;
  } catch (err) {
    handleUnknownError(err, "Search PrintFormats failed");
  }
};

export default searchPrintFormats;
