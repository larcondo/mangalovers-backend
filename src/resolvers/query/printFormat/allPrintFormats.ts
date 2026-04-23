import { prisma } from "@/prisma";
import { handleUnknownError } from "@helpers/unknownErrors";
import { printFormatSelect } from "@constants/index";

const allPrintFormats = async () => {
  try {
    const printFormats = await prisma.printFormat.findMany({
      select: printFormatSelect,
      orderBy: {
        createdAt: "desc",
      },
    });
    return printFormats;
  } catch (err) {
    handleUnknownError(err, "Get All PrintFormats failed");
  }
};

export default allPrintFormats;
