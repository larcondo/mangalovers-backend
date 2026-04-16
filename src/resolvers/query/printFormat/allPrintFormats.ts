import { prisma } from "@/prisma";
import { handleUnknownError } from "@helpers/unknownErrors";

const allPrintFormats = async () => {
  try {
    const printFormats = await prisma.printFormat.findMany({
      orderBy: {
        createdAt: "desc",
      },
      omit: {
        createdAt: true,
        updatedAt: true,
      },
    });
    return printFormats;
  } catch (err) {
    handleUnknownError(err, "Get All PrintFormats failed");
  }
};

export default allPrintFormats;
