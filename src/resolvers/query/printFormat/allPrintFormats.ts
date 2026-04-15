import { prisma } from "@/prisma";
import { GraphQLError } from "graphql";

const allPrintFormats = async () => {
  try {
    const printFormats = await prisma.printFormat.findMany({
      orderBy: {
        createdAt: "desc",
      },
      omit: {
        createdAt: true,
        updatedAt: true,
      },
    });
    return printFormats;
  } catch (err) {
    console.log(err);
    throw new GraphQLError("Get All PrintFormats failed");
  }
};

export default allPrintFormats;
