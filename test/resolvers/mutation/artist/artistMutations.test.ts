import { prismaMock, fakeUserPayload } from "@test/jest.setup";
import artistMutations from "@/resolvers/mutation/artist";
import { GraphQLError } from "graphql";
import { AuthorizationError } from "@/helpers/auth";

describe("artist mutations - create", () => {
  it("create artist successfully", async () => {
    const fakeArtist = { id: 1, name: "Takehiko Inoue" };

    prismaMock.artist.create.mockResolvedValue(fakeArtist as any);

    const result = await artistMutations.createArtist(
      null,
      { name: "Takehiko Inoue" },
      { currentUser: fakeUserPayload },
    );

    expect(result).toBe(fakeArtist);
    expect(prismaMock.artist.create).toHaveBeenCalledTimes(1);
  });

  it("create artist fail if missing currentUser", async () => {
    const fakeArtist = { id: 1, name: "Takehiko Inoue" };

    prismaMock.artist.create.mockResolvedValue(fakeArtist as any);

    try {
      await artistMutations.createArtist(
        null,
        { name: "Takehiko Inoue" },
        { currentUser: null },
      );
    } catch (error) {
      expect(error).toBeInstanceOf(AuthorizationError);
      const { message, extensions } = error as AuthorizationError;
      expect(message).toBe("Forbidden action");
      expect(extensions.code).toBe("FORBIDDEN");
      expect(extensions.http).toStrictEqual({ status: 403 });
    }

    expect(prismaMock.artist.create).not.toHaveBeenCalled();
  });

  it("create artist fail if prisma fail", async () => {
    prismaMock.artist.create.mockRejectedValue(null);

    try {
      await artistMutations.createArtist(
        null,
        { name: "Takehiko Inoue" },
        {
          currentUser: fakeUserPayload,
        },
      );
    } catch (error) {
      expect(error).toBeInstanceOf(GraphQLError);
      const { message, extensions } = error as GraphQLError;
      expect(message).toBe("Create Artist Mutation failed");
      expect(extensions.code).toBe("INTERNAL_SERVER_ERROR");
    }
    expect(prismaMock.artist.create).toHaveBeenCalledTimes(1);
  });
});

describe("artist mutations - update", () => {
  it("update artist successfully", async () => {
    const fakeArtist = { id: 1, name: "Inoue Takehiko" };

    prismaMock.artist.update.mockResolvedValue(fakeArtist as any);

    const result = await artistMutations.updateArtist(
      null,
      {
        id: "1",
        input: {
          name: "Inoue Takehiko",
        },
      },
      {
        currentUser: fakeUserPayload,
      },
    );

    expect(result).toBe(fakeArtist);
    expect(prismaMock.artist.update).toHaveBeenCalledTimes(1);
  });

  it("update artist fail if missing currentUser", async () => {
    const fakeArtist = { id: 1, name: "Inoue Takehiko" };

    prismaMock.artist.update.mockResolvedValue(fakeArtist as any);

    try {
      await artistMutations.updateArtist(
        null,
        { id: "1", input: { name: "Inoue Takehiko" } },
        { currentUser: null },
      );
    } catch (error) {
      expect(error).toBeInstanceOf(AuthorizationError);
      const { message, extensions } = error as AuthorizationError;
      expect(message).toBe("Forbidden action");
      expect(extensions.code).toBe("FORBIDDEN");
      expect(extensions.http).toStrictEqual({ status: 403 });
    }
    expect(prismaMock.artist.update).not.toHaveBeenCalled();
  });

  it("update artist fail if prisma fail", async () => {
    prismaMock.artist.update.mockRejectedValue(null);

    try {
      await artistMutations.updateArtist(
        null,
        {
          id: "1",
          input: {
            name: "Inoue Takehiko",
          },
        },
        {
          currentUser: fakeUserPayload,
        },
      );
    } catch (error) {
      expect(error).toBeInstanceOf(GraphQLError);
      const { message, extensions } = error as GraphQLError;
      expect(message).toBe("Update Artist Mutation failed");
      expect(extensions.code).toBe("INTERNAL_SERVER_ERROR");
    }
    expect(prismaMock.artist.update).toHaveBeenCalledTimes(1);
  });
});
