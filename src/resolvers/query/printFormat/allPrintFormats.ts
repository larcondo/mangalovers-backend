import { prisma } from "@/prisma";
import { AllPrintFormatsArgs } from "@types-app/printFormat";
import { handleUnknownError } from "@helpers/unknownErrors";
import { printFormatSelect } from "@constants/index";
import { PRINT_FORMATS_PAGE_LIMIT } from "@config/patination";
import createPagination from "@helpers/patination";
import { UserInputError } from "@helpers/clientErrors";

const allPrintFormats = async (_: any, args: AllPrintFormatsArgs) => {
  const page = args.page ?? 1;

  try {
    if (page < 1) {
      throw new UserInputError(
        `Wrong page value: ${page}. It must be integer greater or equal than 1`,
        "page",
      );
    }

    const printFormatsQty = await prisma.printFormat.count();

    const pagination = createPagination(
      page,
      printFormatsQty,
      PRINT_FORMATS_PAGE_LIMIT,
    );

    const printFormats = await prisma.printFormat.findMany({
      select: printFormatSelect,
      take: PRINT_FORMATS_PAGE_LIMIT,
      skip: pagination.offset,
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      pagination,
      printFormats,
    };
  } catch (err) {
    handleUnknownError(err, "Get All PrintFormats failed");
  }
};

export default allPrintFormats;
