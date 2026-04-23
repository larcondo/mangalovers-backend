import { prisma } from "@/prisma";
import { GraphQLError } from "graphql";
import logger from "@services/logger";

const printFormatQty = async () => {
  try {
    const qty = await prisma.printFormat.count();
    return qty;
  } catch (err) {
    logger.log(err);
    throw new GraphQLError("Get PrintFormat Quantity failed");
  }
};

export default printFormatQty;
