import { prismaMock, fakeUserPayload } from "@test/jest.setup";
import userQueries from "@/resolvers/query/user";
import { GraphQLError } from "graphql";
import { AuthorizationError } from "@/helpers/auth";
import { seriesSelect } from "@constants/index";

describe("user queries", () => {
  it("user series successfully", async () => {
    const fakeUserSeries: TestUserSeries[] = [
      {
        id: 1,
        series: {
          id: "69516360-b28c-408a-887c-b370d968a0ef",
          name: "Slam Dunk",
          isSingleVolume: false,
          urlCover: "/series/slam-dunk.jpg",
          writer: {
            id: 1,
            name: "Takehiko Inoue",
          },
          illustrator: {
            id: 1,
            name: "Takehiko Inoue",
          },
          publisher: {
            id: 1,
            name: "Ivrea",
          },
          printFormat: {
            id: 1,
            name: "B6 doble",
            description: "B6 con doble cantidad de páginas",
          },
        },
      },
      {
        id: 2,
        series: {
          id: "c4420408-af56-4e48-bd5e-c2abbdccf167",
          name: "Attack on Titan",
          isSingleVolume: false,
          urlCover: "/series/attack-on-titan.jpg",
          writer: {
            id: 2,
            name: "Hajime Isayama",
          },
          illustrator: {
            id: 2,
            name: "Hajime Isayama",
          },
          publisher: {
            id: 3,
            name: "Ovni Press",
          },
          printFormat: {
            id: 5,
            name: "Especial",
            description: "Formato especial",
          },
        },
      },
    ];

    prismaMock.userSeries.findMany.mockResolvedValue(fakeUserSeries as any);

    const result = await userQueries.userSeries(null, null, {
      currentUser: fakeUserPayload,
    });

    expect(result).toBe(fakeUserSeries);
    expect(prismaMock.userSeries.findMany).toHaveBeenCalledTimes(1);
    expect(prismaMock.userSeries.findMany).toHaveBeenCalledWith({
      where: {
        userId: fakeUserPayload.id,
        active: true,
      },
      select: {
        id: true,
        active: true,
        activatedAt: true,
        deactivatedAt: true,
        series: {
          select: seriesSelect,
        },
      },
    });
  });

  it("user series fail if missing currentUser", async () => {
    prismaMock.userSeries.findMany.mockResolvedValue(null as any);

    try {
      await userQueries.userSeries(null, null, {
        currentUser: null,
      });
    } catch (error) {
      expect(error).toBeInstanceOf(AuthorizationError);
      const { message, extensions } = error as AuthorizationError;
      expect(message).toBe("Forbidden action");
      expect(extensions.code).toBe("FORBIDDEN");
      expect(extensions.http).toStrictEqual({ status: 403 });
    }
    expect(prismaMock.userSeries.findMany).not.toHaveBeenCalled();
  });

  it("user series fail if prisma fails", async () => {
    prismaMock.userSeries.findMany.mockRejectedValue(null);

    try {
      await userQueries.userSeries(null, null, {
        currentUser: fakeUserPayload,
      });
    } catch (error) {
      expect(error).toBeInstanceOf(GraphQLError);
      const { message } = error as GraphQLError;
      expect(message).toBe("Get UserSeries failed");
    }
    expect(prismaMock.userSeries.findMany).toHaveBeenCalledTimes(1);
  });
});
