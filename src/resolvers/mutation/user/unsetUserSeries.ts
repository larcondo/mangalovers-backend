import { AuthorizationError } from "@/helpers/auth";
import { handleMutationError } from "@/helpers/mutationErrors";
import { prisma } from "@/prisma";
import { Authorization } from "@/types/user";

interface UnsetUserSeriesArgs {
  seriesId: string;
}

const unsetUserSeries = async (
  _: any,
  { seriesId }: UnsetUserSeriesArgs,
  context: Authorization,
) => {
  try {
    if (!context.currentUser) throw new AuthorizationError("Forbidden action");

    const record = await prisma.userSeries.update({
      where: {
        userId_seriesId: {
          seriesId,
          userId: context.currentUser.id,
        },
      },
      data: {
        active: false,
        deactivatedAt: new Date(),
      },
      select: {
        id: true,
        active: true,
        activatedAt: true,
        deactivatedAt: true,
      },
    });

    return record;
  } catch (error) {
    handleMutationError(error, true, "Unset UserSeries Mutation failed");
  }
};

export default unsetUserSeries;
