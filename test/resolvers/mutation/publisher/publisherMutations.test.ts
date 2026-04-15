import { prismaMock, fakeUserPayload } from "@test/jest.setup";
import publisherMutations from "@/resolvers/mutation/publisher";
import { GraphQLError } from "graphql";
import { AuthorizationError } from "@/helpers/auth";

describe("publisher mutations - create", () => {
  it("create publisher successfully", async () => {
    const fakePublisher = { id: 1, name: "Ivrea" };

    prismaMock.publisher.create.mockResolvedValue(fakePublisher as any);

    const result = await publisherMutations.createPublisher(
      null,
      { name: "Ivrea" },
      { currentUser: fakeUserPayload },
    );

    expect(result).toBe(fakePublisher);
    expect(prismaMock.publisher.create).toHaveBeenCalledTimes(1);
  });

  it("create publisher fail if missing currentUser", async () => {
    const fakePublisher = { id: 1, name: "Ivrea" };

    prismaMock.publisher.create.mockResolvedValue(fakePublisher as any);

    try {
      await publisherMutations.createPublisher(
        null,
        { name: "Ivrea" },
        { currentUser: null },
      );
    } catch (error) {
      expect(error).toBeInstanceOf(AuthorizationError);
      const { message, extensions } = error as AuthorizationError;
      expect(message).toBe("Forbidden action");
      expect(extensions.code).toBe("FORBIDDEN");
      expect(extensions.http).toStrictEqual({ status: 403 });
    }

    expect(prismaMock.publisher.create).not.toHaveBeenCalled();
  });

  it("create publisher fail if prisma fail", async () => {
    prismaMock.publisher.create.mockRejectedValue(null);

    try {
      await publisherMutations.createPublisher(
        null,
        { name: "Ivrea" },
        { currentUser: fakeUserPayload },
      );
    } catch (error) {
      expect(error).toBeInstanceOf(GraphQLError);
      const { message, extensions } = error as GraphQLError;
      expect(message).toBe("Create Publisher Mutation failed");
      expect(extensions.code).toBe("INTERNAL_SERVER_ERROR");
    }
    expect(prismaMock.publisher.create).toHaveBeenCalledTimes(1);
  });
});

describe("publisher mutations - update", () => {
  it("update publisher successfully", async () => {
    const fakePublisher = { id: 1, name: "Ivrea Arg" };

    prismaMock.publisher.update.mockResolvedValue(fakePublisher as any);

    const result = await publisherMutations.updatePublisher(
      null,
      { id: "1", input: { name: "Ivrea Arg" } },
      { currentUser: fakeUserPayload },
    );

    expect(result).toBe(fakePublisher);
    expect(prismaMock.publisher.update).toHaveBeenCalledTimes(1);
  });

  it("update publisher fail if missing currentUser", async () => {
    const fakePublisher = { id: 1, name: "Ivrea Arg" };

    prismaMock.publisher.update.mockResolvedValue(fakePublisher as any);

    try {
      await publisherMutations.updatePublisher(
        null,
        { id: "1", input: { name: "Ivrea Arg" } },
        { currentUser: null },
      );
    } catch (error) {
      expect(error).toBeInstanceOf(AuthorizationError);
      const { message, extensions } = error as AuthorizationError;
      expect(message).toBe("Forbidden action");
      expect(extensions.code).toBe("FORBIDDEN");
      expect(extensions.http).toStrictEqual({ status: 403 });
    }
    expect(prismaMock.publisher.update).not.toHaveBeenCalled();
  });

  it("update publisher fail if prisma fail", async () => {
    prismaMock.publisher.update.mockRejectedValue(null);

    try {
      await publisherMutations.updatePublisher(
        null,
        { id: "1", input: { name: "Ivrea Arg" } },
        { currentUser: fakeUserPayload },
      );
    } catch (error) {
      expect(error).toBeInstanceOf(GraphQLError);
      const { message, extensions } = error as GraphQLError;
      expect(message).toBe("Update Publisher Mutation failed");
      expect(extensions.code).toBe("INTERNAL_SERVER_ERROR");
    }
    expect(prismaMock.publisher.update).toHaveBeenCalledTimes(1);
  });
});
