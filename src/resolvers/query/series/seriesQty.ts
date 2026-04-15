import { prisma } from "@/prisma";
import { GraphQLError } from "graphql";

const seriesQty = async () => {
  try {
    const qty = await prisma.series.count();
    return qty;
  } catch (err) {
    console.log(err);
    throw new GraphQLError("Get Series Quantity failed");
  }
};

export default seriesQty;
