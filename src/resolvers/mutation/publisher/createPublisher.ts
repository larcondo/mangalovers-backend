import { prisma } from "src/prisma";
import { GraphQLError } from "graphql";
import { CreatePublisherArgs } from "src/types/publisher";

const createPublisher = async (_: any, { name }: CreatePublisherArgs) => {
  try {
    const publisher = await prisma.publisher.create({
      data: {
        name,
      },
    });
    return publisher;
  } catch (err) {
    console.log(err);
    throw new GraphQLError("Create Publisher Mutation failed");
  }
};

export default createPublisher;
