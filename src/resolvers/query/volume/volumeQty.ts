import { prisma } from "@/prisma";
import { GraphQLError } from "graphql";

const volumeQty = async () => {
  try {
    const qty = await prisma.volume.count();
    return qty;
  } catch (err) {
    console.log(err);
    throw new GraphQLError("Get Volumes Quantity failed");
  }
};

export default volumeQty;
