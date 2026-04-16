import { prisma } from "@/prisma";
import { SearchArgs } from "@types-app/general";
import { handleUnknownError } from "@helpers/unknownErrors";

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
      omit: {
        createdAt: true,
        updatedAt: true,
      },
    });

    return publishers;
  } catch (err) {
    handleUnknownError(err, "Search Publishers failed");
  }
};

export default searchPublishers;
