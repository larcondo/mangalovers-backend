import { AuthorizationError } from "@/helpers/auth";
import { handleUnknownError } from "@helpers/unknownErrors";
import { prisma } from "@/prisma";
import { AuthService } from "@/services/auth";
import { UpdatePrintFormatArgs } from "@/types/printFormat";
import { Authorization } from "@/types/user";
import { parseSingleIntId } from "@utils/parsers";
import { printFormatSelect } from "@constants/index";

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
      select: printFormatSelect,
    });

    return printFormat;
  } catch (err) {
    handleUnknownError(err, "Update PrintFormat Mutation failed");
  }
};

export default updatePrintFormat;
