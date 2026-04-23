import { prisma } from "@/prisma";
import { handleUnknownError } from "@helpers/unknownErrors";

const seriesQty = async () => {
  try {
    const qty = await prisma.series.count();
    return qty;
  } catch (err) {
    handleUnknownError(err, "Get Series Quantity failed");
  }
};

export default seriesQty;
