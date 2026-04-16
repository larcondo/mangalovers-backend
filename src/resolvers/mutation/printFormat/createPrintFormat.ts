import { prisma } from "@/prisma";
import { CreatePrintFormat } from "@types-app/printFormat";
import { handleUnknownError } from "@helpers/unknownErrors";
import { Authorization } from "@types-app/user";
import { AuthorizationError } from "@helpers/auth";
import { AuthService } from "@services/auth";

const createPrintFormat = async (
  _: any,
  { name, description }: CreatePrintFormat,
  context: Authorization,
) => {
  try {
    // Check if the user is allowed to create
    if (!AuthService.isUserAuthorized(context))
      throw new AuthorizationError("Forbidden action");

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
    handleUnknownError(err, "Create PrintFormat Mutation failed");
  }
};

export default createPrintFormat;
