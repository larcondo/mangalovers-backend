import { UserInputError } from "@/helpers/clientErrors";
import { prisma } from "@/prisma";
import logger from "@services/logger";
import { VolumeByIdArgs } from "@types-app/volume";
import { GraphQLError } from "graphql";
import { volumeSelect } from "@constants/index";

const volumeById = async (_: any, args: VolumeByIdArgs) => {
  const { id } = args;

  try {
    const volume = await prisma.volume.findUnique({
      where: { id },
      select: volumeSelect,
    });

    if (!volume)
      throw new UserInputError(
        `The volume with id ${id} does not exist.`,
        "id",
      );

    return volume;
  } catch (err) {
    logger.log(err);
    if (err instanceof GraphQLError) {
      throw err;
    } else {
      throw new GraphQLError("Get Volume by Id failed");
    }
  }
};

export default volumeById;
