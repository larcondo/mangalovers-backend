import { prisma } from "@/prisma";
import { CreatePublisherArgs } from "@types-app/publisher";
import { Authorization } from "@types-app/user";
import { AuthorizationError } from "@helpers/auth";
import { handleMutationError } from "@helpers/mutationErrors";
import { AuthService } from "@services/auth";

const createPublisher = async (
  _: any,
  { name }: CreatePublisherArgs,
  context: Authorization,
) => {
  try {
    // Check if the user is allowed to create
    if (!AuthService.isUserAuthorized(context))
      throw new AuthorizationError("Forbidden action");

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
