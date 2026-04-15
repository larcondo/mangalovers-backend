import { prisma } from "@/prisma";
import { GraphQLError } from "graphql";

const printFormatQty = async () => {
  try {
    const qty = await prisma.printFormat.count();
    return qty;
  } catch (err) {
    console.log(err);
    throw new GraphQLError("Get PrintFormat Quantity failed");
  }
};

export default printFormatQty;
