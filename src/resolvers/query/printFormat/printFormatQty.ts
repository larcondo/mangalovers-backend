import { prisma } from "@/prisma";
import { handleUnknownError } from "@helpers/unknownErrors";

const printFormatQty = async () => {
  try {
    const qty = await prisma.printFormat.count();
    return qty;
  } catch (err) {
    handleUnknownError(err, "Get PrintFormat Quantity failed");
  }
};

export default printFormatQty;
