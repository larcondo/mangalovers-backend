import { prisma } from "src/prisma";
import { CreatePublisherArgs } from "src/types/publisher";
import { Authorization } from "src/types/user";
import { verifyUserContext } from "src/helpers/auth";
import { handleMutationError } from "src/helpers/mutationErrors";

const createPublisher = async (
  _: any,
  { name }: CreatePublisherArgs,
  context: Authorization,
) => {
  try {
    // Check if the user is allowed to create
    verifyUserContext(context);

    const publisher = await prisma.publisher.create({
      data: {
        name,
      },
      omit: {
        createdAt: true,
        updatedAt: true,
      },
    });
    return publisher;
  } catch (err) {
    handleMutationError(err, true, "Create Publisher Mutation failed");
  }
};

export default createPublisher;
