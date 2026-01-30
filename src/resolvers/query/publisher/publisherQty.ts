import { prisma } from "src/prisma";
import { GraphQLError } from "graphql";

const publisherQty = async () => {
  try {
    const qty = await prisma.publisher.count();
    return qty;
  } catch (err) {
    console.log(err);
    throw new GraphQLError("Get Publisher Quantity failed");
  }
};

export default publisherQty;
