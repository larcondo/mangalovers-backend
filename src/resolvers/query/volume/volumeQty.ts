import { prisma } from "@/prisma";
import { handleUnknownError } from "@helpers/unknownErrors";

const volumeQty = async () => {
  try {
    const qty = await prisma.volume.count();
    return qty;
  } catch (err) {
    handleUnknownError(err, "Get Volumes Quantity failed");
  }
};

export default volumeQty;
