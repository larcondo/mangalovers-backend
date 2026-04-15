import { prismaMock, fakeUserPayload } from "@test/jest.setup";
import userMutations from "@/resolvers/mutation/user";
import { GraphQLError } from "graphql";
import { AuthorizationError } from "@/helpers/auth";

describe("user mutations - setUserSeries", () => {
  it("set user series successfully", async () => {
    const fakeResult: TestUserSeriesBasic = {
      id: 1,
      active: true,
      activatedAt: new Date(),
      deactivatedAt: null,
    };

    prismaMock.userSeries.upsert.mockResolvedValue(fakeResult as any);

    const result = await userMutations.setUserSeries(
      null,
      { seriesId: "69516360-b28c-408a-887c-b370d968a0ef" },
      { currentUser: fakeUserPayload },
    );

    expect(result).toBe(fakeResult);
    expect(prismaMock.userSeries.upsert).toHaveBeenCalledTimes(1);
  });

  it("set user series fail if missing currentUser", async () => {
    prismaMock.userSeries.upsert.mockResolvedValue(null as any);

    try {
      await userMutations.setUserSeries(
        null,
        { seriesId: "69516360-b28c-408a-887c-b370d968a0ef" },
        { currentUser: null },
      );
    } catch (error) {
      expect(error).toBeInstanceOf(AuthorizationError);
      const { message, extensions } = error as AuthorizationError;
      expect(message).toBe("Forbidden action");
      expect(extensions.code).toBe("FORBIDDEN");
      expect(extensions.http).toStrictEqual({ status: 403 });
    }
    expect(prismaMock.userSeries.upsert).not.toHaveBeenCalled();
  });

  it("set user series fail if prima fails", async () => {
    prismaMock.userSeries.upsert.mockRejectedValue(null);

    try {
      await userMutations.setUserSeries(
        null,
        { seriesId: "69516360-b28c-408a-887c-b370d968a0ef" },
        { currentUser: fakeUserPayload },
      );
    } catch (error) {
      expect(error).toBeInstanceOf(GraphQLError);
      const { message, extensions } = error as GraphQLError;
      expect(message).toBe("Set UserSeries Mutation failed");
      expect(extensions.code).toBe("INTERNAL_SERVER_ERROR");
    }
    expect(prismaMock.userSeries.upsert).toHaveBeenCalledTimes(1);
  });
});

describe("user mutations - unsetUserSeries", () => {
  it("unset user series successfully", async () => {
    const fakeResult: TestUserSeriesBasic = {
      id: 1,
      active: false,
      activatedAt: new Date("2026-03-28"),
      deactivatedAt: new Date("2026-04-01"),
    };

    prismaMock.userSeries.update.mockResolvedValue(fakeResult as any);

    const result = await userMutations.unsetUserSeries(
      null,
      { seriesId: "69516360-b28c-408a-887c-b370d968a0ef" },
      { currentUser: fakeUserPayload },
    );

    expect(result).toBe(fakeResult);
    expect(prismaMock.userSeries.update).toHaveBeenCalledTimes(1);
  });

  it("unset user series fail if missing currentUser", async () => {
    prismaMock.userSeries.update.mockResolvedValue(null as any);

    try {
      await userMutations.unsetUserSeries(
        null,
        { seriesId: "69516360-b28c-408a-887c-b370d968a0ef" },
        { currentUser: null },
      );
    } catch (error) {
      expect(error).toBeInstanceOf(AuthorizationError);
      const { message, extensions } = error as AuthorizationError;
      expect(message).toBe("Forbidden action");
      expect(extensions.code).toBe("FORBIDDEN");
      expect(extensions.http).toStrictEqual({ status: 403 });
    }
    expect(prismaMock.userSeries.update).not.toHaveBeenCalled();
  });

  it("unset user series fail if prisma fails", async () => {
    prismaMock.userSeries.update.mockRejectedValue(null);

    try {
      await userMutations.unsetUserSeries(
        null,
        { seriesId: "69516360-b28c-408a-887c-b370d968a0ef" },
        { currentUser: fakeUserPayload },
      );
    } catch (error) {
      expect(error).toBeInstanceOf(GraphQLError);
      const { message, extensions } = error as GraphQLError;
      expect(message).toBe("Unset UserSeries Mutation failed");
      expect(extensions.code).toBe("INTERNAL_SERVER_ERROR");
    }
    expect(prismaMock.userSeries.update).toHaveBeenCalledTimes(1);
  });
});
