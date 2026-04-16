import { prisma } from "@/prisma";
import { handleUnknownError } from "@helpers/unknownErrors";

const publisherQty = async () => {
  try {
    const qty = await prisma.publisher.count();
    return qty;
  } catch (err) {
    handleUnknownError(err, "Get Publisher Quantity failed");
  }
};

export default publisherQty;
