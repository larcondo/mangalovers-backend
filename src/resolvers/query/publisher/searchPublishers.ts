import { prisma } from "@/prisma";
import { SearchArgs } from "@types-app/general";
import { handleUnknownError } from "@helpers/unknownErrors";
import { publisherSelect } from "@constants/index";

const searchPublishers = async (_: any, args: SearchArgs) => {
  const { query } = args;
  const lowerCaseQuery = query.toLowerCase();

  try {
    const publishers = await prisma.publisher.findMany({
      where: {
        name: {
          contains: lowerCaseQuery,
          mode: "insensitive",
        },
      },
      select: publisherSelect,
    });

    return publishers;
  } catch (err) {
    handleUnknownError(err, "Search Publishers failed");
  }
};

export default searchPublishers;
