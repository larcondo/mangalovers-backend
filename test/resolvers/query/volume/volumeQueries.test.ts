import { prismaMock } from "@test/jest.setup";
import volumeQueries from "@/resolvers/query/volume";
import { GraphQLError } from "graphql";
import { volumeSelect } from "@constants/index";
import { UserInputError } from "@/helpers/clientErrors";

describe("volume queries", () => {
  // Reset prismaMock beforeEach in jest.setup.ts

  it("volume quantity", async () => {
    const fakeQty = 2;
    prismaMock.volume.count.mockResolvedValue(fakeQty);

    const result = await volumeQueries.volumeQty();
    expect(result).toBe(fakeQty);
    expect(prismaMock.volume.count).toHaveBeenCalledTimes(1);
  });

  it("volume quantity fail if prisma fail", async () => {
    prismaMock.volume.count.mockRejectedValue(null);

    try {
      await volumeQueries.volumeQty();
    } catch (error) {
      expect(error).toBeInstanceOf(GraphQLError);
      const { message } = error as GraphQLError;
      expect(message).toBe("Get Volumes Quantity failed");
    }
    expect(prismaMock.volume.count).toHaveBeenCalledTimes(1);
  });

  it("all volumes", async () => {
    const fakeVolumes: TestVolume[] = [
      {
        id: "ee05a8ab-3a1c-4463-bbb5-3070be507497",
        number: 1,
        title: "Volumen 1",
        urlCover: "/volumes/slam-dunk01.jpg",
        synopsis: "Demo synopsis",
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
        id: "250bcd2b-2e33-4320-98eb-4ad7982a50ea",
        number: 2,
        title: "Volumen 2",
        urlCover: "/volumes/slam-dunk02.jpg",
        synopsis: "Demo synopsis",
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
    ];

    prismaMock.volume.findMany.mockResolvedValue(fakeVolumes as any);

    const result = await volumeQueries.allVolumes(null, { page: 1 });

    expect(result.length).toBe(fakeVolumes.length);
    expect(result).toBe(fakeVolumes);
    expect(prismaMock.volume.findMany).toHaveBeenCalledTimes(1);
    expect(prismaMock.volume.findMany).toHaveBeenCalledWith({
      include: {
        series: true,
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

  it("all volumes fail if prisma fail", async () => {
    prismaMock.volume.findMany.mockRejectedValue(null);

    try {
      await volumeQueries.allVolumes(null, { page: 1 });
    } catch (error) {
      expect(error).toBeInstanceOf(GraphQLError);
      const { message } = error as GraphQLError;
      expect(message).toBe("Get All Volumes failed");
    }
    expect(prismaMock.volume.findMany).toHaveBeenCalledTimes(1);
  });

  it("volume by id", async () => {
    const fakeVolume: TestVolume = {
      id: "ee05a8ab-3a1c-4463-bbb5-3070be507497",
      number: 1,
      title: "Volumen 1",
      urlCover: "/volumes/slam-dunk01.jpg",
      synopsis: "Demo synopsis",
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
    };

    prismaMock.volume.findUnique.mockResolvedValue(fakeVolume as any);

    const result = await volumeQueries.volumeById(null, {
      id: "ee05a8ab-3a1c-4463-bbb5-3070be507497",
    });

    expect(result).toBeDefined();
    expect(result).toBe(fakeVolume);
    expect(prismaMock.volume.findUnique).toHaveBeenCalledTimes(1);
    expect(prismaMock.volume.findUnique).toHaveBeenCalledWith({
      where: { id: fakeVolume.id },
      select: volumeSelect,
    });
  });

  it("volume by id fail if id does not exist", async () => {
    const nonExistingId = "ee05a8ab-3a1c-4463-bbb5-000000000000";

    prismaMock.volume.findUnique.mockResolvedValue(null);

    try {
      await volumeQueries.volumeById(null, { id: nonExistingId });
    } catch (error) {
      expect(error).toBeInstanceOf(UserInputError);
      const { message, extensions } = error as UserInputError;
      expect(message).toBe(
        `The volume with id ${nonExistingId} does not exist.`,
      );
      expect(extensions.field).toBe("id");
    }
    expect(prismaMock.volume.findUnique).toHaveBeenCalledTimes(1);
  });

  it("volume by id fail if prisma fails", async () => {
    prismaMock.volume.findUnique.mockRejectedValue(null);

    try {
      await volumeQueries.volumeById(null, {
        id: "ee05a8ab-3a1c-4463-bbb5-3070be507497",
      });
    } catch (error) {
      expect(error).toBeInstanceOf(GraphQLError);
      const { message } = error as GraphQLError;
      expect(message).toBe("Get Volume by Id failed");
    }
    expect(prismaMock.volume.findUnique).toHaveBeenCalledTimes(1);
  });
});
