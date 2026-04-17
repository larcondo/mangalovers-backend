import { prisma } from "@/prisma";
import { AuthorizationError } from "@helpers/auth";
import { Authorization } from "@types-app/user";
import { handleUnknownError } from "@helpers/unknownErrors";
import { seriesSelect } from "@constants/index";

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
        active: true,
        activatedAt: true,
        deactivatedAt: true,
        series: {
          select: seriesSelect,
        },
      },
    });
    return records;
  } catch (err) {
    handleUnknownError(err, "Get UserSeries failed");
  }
};

export default userSeries;
