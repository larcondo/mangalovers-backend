import { AuthorizationError } from "@/helpers/auth";
import { handleMutationError } from "@/helpers/mutationErrors";
import { prisma } from "@/prisma";
import { AuthService } from "@/services/auth";
import { UpdatePrintFormatArgs } from "@/types/printFormat";
import { Authorization } from "@/types/user";
import { parseSingleIntId } from "@utils/parsers";

const updatePrintFormat = async (
  _: any,
  args: UpdatePrintFormatArgs,
  context: Authorization,
) => {
  try {
    // Check if the user is allowed to update
    if (!AuthService.isUserAuthorized(context))
      throw new AuthorizationError("Forbidden action");

    const printFormat = await prisma.printFormat.update({
      where: {
        id: parseSingleIntId(args.id, "printFormatId"),
      },
      data: args.input,
      omit: {
        createdAt: true,
        updatedAt: true,
      },
    });

    return printFormat;
  } catch (err) {
    handleMutationError(err, true, "Update PrintFormat Mutation failed");
  }
};

export default updatePrintFormat;
