import { prisma } from "@/prisma";
import { AuthorizationError } from "@helpers/auth";
import { Authorization } from "@types-app/user";
import { handleUnknownError } from "@helpers/unknownErrors";

const userSeries = async (_: any, args: any, context: Authorization) => {
  try {
    if (!context.currentUser) throw new AuthorizationError("Forbidden action");

    const records = await prisma.userSeries.findMany({
      where: {
        userId: context.currentUser.id,
        active: true,
      },
      select: {
        id: true,
        series: {
          include: {
            writer: true,
            illustrator: true,
            publisher: true,
            printFormat: true,
          },
          omit: {
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });
    return records;
  } catch (err) {
    handleUnknownError(err, "Get UserSeries failed");
  }
};

export default userSeries;
