import { prisma } from "@/prisma";
import { handleUnknownError } from "@helpers/unknownErrors";

const allPublishers = async () => {
  try {
    const publishers = await prisma.publisher.findMany({
      orderBy: {
        createdAt: "desc",
      },
      omit: {
        createdAt: true,
        updatedAt: true,
      },
    });
    return publishers;
  } catch (err) {
    handleUnknownError(err, "Get All Publishers failed");
  }
};

export default allPublishers;
