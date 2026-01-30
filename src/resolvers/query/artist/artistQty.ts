import { prisma } from "src/prisma";
import { GraphQLError } from "graphql";

const artistQty = async () => {
  try {
    const qty = await prisma.artist.count();
    return qty;
  } catch (err) {
    console.log(err);
    throw new GraphQLError("Get Artist Quantity failed");
  }
};

export default artistQty;
