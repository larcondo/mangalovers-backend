import { prismaMock } from "@test/jest.setup";
import seriesQueries from "@/resolvers/query/series";
import { GraphQLError } from "graphql";

describe("series queries", () => {
  // Reset prismaMock beforeEach in jest.setup.ts

  it("series quantity", async () => {
    const fakeQty = 3;
    prismaMock.series.count.mockResolvedValue(fakeQty);

    const result = await seriesQueries.seriesQty();

    expect(result).toBe(fakeQty);
    expect(prismaMock.series.count).toHaveBeenCalledTimes(1);
  });

  it("series quantity fail if prisma fail", async () => {
    prismaMock.series.count.mockRejectedValue(null);

    try {
      await seriesQueries.seriesQty();
    } catch (error) {
      expect(error).toBeInstanceOf(GraphQLError);
      const { message } = error as GraphQLError;
      expect(message).toBe("Get Series Quantity failed");
    }
    expect(prismaMock.series.count).toHaveBeenCalledTimes(1);
  });

  it("all series", async () => {
    const fakeSeries: TestSeries[] = [
      {
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
      {
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
    ];

    prismaMock.series.findMany.mockResolvedValue(fakeSeries as any);

    const result = await seriesQueries.allSeries(null, { page: 1 });

    expect(result.length).toBe(2);
    expect(result).toBe(fakeSeries);
    expect(prismaMock.series.findMany).toHaveBeenCalledTimes(1);
    expect(prismaMock.series.findMany).toHaveBeenCalledWith({
      include: {
        illustrator: true,
        writer: true,
        printFormat: true,
        publisher: true,
      },
      take: 20,
      skip: 0,
      orderBy: {
        createdAt: "desc",
      },
      omit: {
        createdAt: true,
        updatedAt: true,
      },
    });
  });

  it("all series fail if prisma fail", async () => {
    prismaMock.series.findMany.mockRejectedValue(null);

    try {
      await seriesQueries.allSeries(null, { page: 1 });
    } catch (error) {
      expect(error).toBeInstanceOf(GraphQLError);
      const { message } = error as GraphQLError;
      expect(message).toBe("Get All Series failed");
    }
    expect(prismaMock.series.findMany).toHaveBeenCalledTimes(1);
  });
});
