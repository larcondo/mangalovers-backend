import { prisma } from "@/prisma";
import { GraphQLError } from "graphql";
import logger from "@services/logger";

const volumeQty = async () => {
  try {
    const qty = await prisma.volume.count();
    return qty;
  } catch (err) {
    logger.log(err);
    throw new GraphQLError("Get Volumes Quantity failed");
  }
};

export default volumeQty;
