import { prisma } from "@/prisma";
import { SearchArgs } from "@types-app/general";
import { handleUnknownError } from "@helpers/unknownErrors";

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
      omit: {
        createdAt: true,
        updatedAt: true,
      },
    });

    return printFormats;
  } catch (err) {
    handleUnknownError(err, "Search PrintFormats failed");
  }
};

export default searchPrintFormats;
