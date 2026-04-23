import { prisma } from "@/prisma";
import { AllPublishersArgs } from "@types-app/publisher";
import { handleUnknownError } from "@helpers/unknownErrors";
import { publisherSelect } from "@constants/index";
import { PUBLISHERS_PAGE_LIMIT } from "@config/patination";
import createPagination from "@helpers/patination";
import { UserInputError } from "@helpers/clientErrors";

const allPublishers = async (_: any, args: AllPublishersArgs) => {
  const page = args.page ?? 1;

  try {
    if (page < 1) {
      throw new UserInputError(
        `Wrong page value: ${page}. It must be integer greater or equal than 1`,
        "page",
      );
    }

    const publishersQty = await prisma.publisher.count();

    const pagination = createPagination(
      page,
      publishersQty,
      PUBLISHERS_PAGE_LIMIT,
    );

    const publishers = await prisma.publisher.findMany({
      select: publisherSelect,
      take: PUBLISHERS_PAGE_LIMIT,
      skip: pagination.offset,
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      pagination,
      publishers,
    };
  } catch (err) {
    handleUnknownError(err, "Get All Publishers failed");
  }
};

export default allPublishers;
