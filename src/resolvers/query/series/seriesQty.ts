import { prisma } from "@/prisma";
import { GraphQLError } from "graphql";
import logger from "@services/logger";

const seriesQty = async () => {
  try {
    const qty = await prisma.series.count();
    return qty;
  } catch (err) {
    logger.log(err);
    throw new GraphQLError("Get Series Quantity failed");
  }
};

export default seriesQty;
