import { prisma } from "@/prisma";
import { GraphQLError } from "graphql";
import logger from "@services/logger";

const publisherQty = async () => {
  try {
    const qty = await prisma.publisher.count();
    return qty;
  } catch (err) {
    logger.log(err);
    throw new GraphQLError("Get Publisher Quantity failed");
  }
};

export default publisherQty;
