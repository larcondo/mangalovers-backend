import { prisma } from "@/prisma";
import { CreatePrintFormat } from "@types-app/printFormat";
import { handleMutationError } from "@helpers/mutationErrors";
import { Authorization } from "@types-app/user";
import { verifyUserContext } from "@helpers/auth";

const createPrintFormat = async (
  _: any,
  { name, description }: CreatePrintFormat,
  context: Authorization,
) => {
  try {
    // Check if the user is allowed to create
    verifyUserContext(context);

    const printFormat = await prisma.printFormat.create({
      data: {
        name,
        description,
      },
      omit: {
        createdAt: true,
        updatedAt: true,
      },
    });
    return printFormat;
  } catch (err) {
    handleMutationError(err, true, "Create PrintFormat Mutation failed");
  }
};

export default createPrintFormat;
