import { prisma } from "@/prisma";
import { handleUnknownError } from "@helpers/unknownErrors";
import { publisherSelect } from "@constants/index";

const allPublishers = async () => {
  try {
    const publishers = await prisma.publisher.findMany({
      select: publisherSelect,
      orderBy: {
        createdAt: "desc",
      },
    });
    return publishers;
  } catch (err) {
    handleUnknownError(err, "Get All Publishers failed");
  }
};

export default allPublishers;
