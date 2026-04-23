import { prisma } from "@/prisma";
import { handleUnknownError } from "@helpers/unknownErrors";

const artistQty = async () => {
  try {
    const qty = await prisma.artist.count();
    return qty;
  } catch (err) {
    handleUnknownError(err, "Get Artist Quantity failed");
  }
};

export default artistQty;
