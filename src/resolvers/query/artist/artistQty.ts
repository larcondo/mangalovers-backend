import { prisma } from "@/prisma";
import { GraphQLError } from "graphql";
import logger from "@services/logger";

const artistQty = async () => {
  try {
    const qty = await prisma.artist.count();
    return qty;
  } catch (err) {
    logger.log(err);
    throw new GraphQLError("Get Artist Quantity failed");
  }
};

export default artistQty;
