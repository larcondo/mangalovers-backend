import { prisma } from "@/prisma";
import { UpdatePublisherArgs } from "@types-app/publisher";
import { handleMutationError } from "@helpers/mutationErrors";
import { Authorization } from "@types-app/user";
import { AuthService } from "@/services/auth";
import { AuthorizationError } from "@helpers/auth";
import { parseSingleIntId } from "@utils/parsers";

const updatePublisher = async (
  _: any,
  args: UpdatePublisherArgs,
  context: Authorization,
) => {
  try {
    // Check if the user is allowed to update
    if (!AuthService.isUserAuthorized(context))
      throw new AuthorizationError("Forbidden action");

    const publisher = await prisma.publisher.update({
      where: {
        id: parseSingleIntId(args.id, "publisherId"),
      },
      data: args.input,
      omit: {
        createdAt: true,
        updatedAt: true,
      },
    });

    return publisher;
  } catch (err) {
    handleMutationError(err, true, "Update Publisher Mutation failed");
  }
};

export default updatePublisher;
