import { prisma } from "@/prisma";
import { handleUnknownError } from "@helpers/unknownErrors";
import { Authorization } from "@/types/user";
import { AuthorizationError } from "@/helpers/auth";

interface SetUserSeriesArgs {
  seriesId: string;
}

const setUserSeries = async (
  _: any,
  { seriesId }: SetUserSeriesArgs,
  context: Authorization,
) => {
  try {
    if (!context.currentUser) throw new AuthorizationError("Forbidden action");

    const record = await prisma.userSeries.upsert({
      where: {
        userId_seriesId: {
          seriesId,
          userId: context.currentUser.id,
        },
      },
      update: {
        active: true,
        activatedAt: new Date(),
      },
      create: {
        userId: context.currentUser.id,
        seriesId,
      },
      select: {
        id: true,
        active: true,
        activatedAt: true,
        deactivatedAt: true,
      },
    });
    return record;
  } catch (err) {
    handleUnknownError(err, "Set UserSeries Mutation failed");
  }
};

export default setUserSeries;
