import { prismaMock, fakeUserPayload } from "@test/jest.setup";
import volumeMutations from "@/resolvers/mutation/volume";
import { UserInputError } from "@/helpers/clientErrors";
import { AuthorizationError } from "@/helpers/auth";
import { GraphQLError } from "graphql";

describe("volume mutations - create", () => {
  it("create volume successfully", async () => {
    const fakeVolume: TestVolume = {
      id: "ee05a8ab-3a1c-4463-bbb5-3070be507497",
      number: 1,
      title: "Volumen 1",
      urlCover: "/volumes/slam-dunk01.jpg",
      synopsis: "Demo synopsis",
      publicationDate: "2021-08-03T00:00:00.000Z",
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

    prismaMock.series.count.mockResolvedValue(1);
    prismaMock.volume.create.mockResolvedValue(fakeVolume as any);

    const result = await volumeMutations.createVolume(
      null,
      {
        seriesId: "69516360-b28c-408a-887c-b370d968a0ef",
        number: 1,
        title: "Volumen 1",
        urlCover: "/volumes/slam-dunk01.jpg",
        synopsis: "Demo synopsis",
        publicationDate: new Date("2021-08-03"),
      },
      { currentUser: fakeUserPayload },
    );

    expect(result).toBe(fakeVolume);
    expect(prismaMock.series.count).toHaveBeenCalledTimes(1);
    expect(prismaMock.volume.create).toHaveBeenCalledTimes(1);
    expect(prismaMock.volume.create).toHaveBeenCalledWith({
      data: {
        number: fakeVolume.number,
        seriesId: fakeVolume.series.id,
        title: fakeVolume.title,
        synopsis: fakeVolume.synopsis,
        urlCover: fakeVolume.urlCover,
        publicationDate: new Date("2021-08-03"),
      },
      include: {
        series: true,
      },
    });
  });

  it("create volume fail if series doesn't exist", async () => {
    const fakeVolume: TestVolume = {
      id: "ee05a8ab-3a1c-4463-bbb5-3070be507497",
      number: 1,
      title: "Volumen 1",
      urlCover: "/volumes/slam-dunk01.jpg",
      synopsis: "Demo synopsis",
      publicationDate: "2021-08-03T00:00:00.000Z",
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

    prismaMock.series.count.mockResolvedValue(0);
    prismaMock.volume.create.mockResolvedValue(fakeVolume as any);

    try {
      await volumeMutations.createVolume(
        null,
        {
          seriesId: "69516360-b28c-408a-887c-000000000000",
          number: 1,
          title: "Volumen 1",
          urlCover: "/volumes/slam-dunk01.jpg",
          synopsis: "Demo synopsis",
          publicationDate: new Date("2021-08-03"),
        },
        { currentUser: fakeUserPayload },
      );
    } catch (error) {
      expect(error).toBeInstanceOf(UserInputError);
      const { message, extensions } = error as UserInputError;
      expect(message).toBe("Series id doesn't exist.");
      expect(extensions.field).toBe("seriesId");
      expect(extensions.http).toStrictEqual({ status: 400 });
    }

    expect(prismaMock.series.count).toHaveBeenCalledTimes(1);
    expect(prismaMock.volume.create).not.toHaveBeenCalled();
  });

  it("create volume fail if is missing currentUser", async () => {
    const fakeVolume: TestVolume = {
      id: "ee05a8ab-3a1c-4463-bbb5-3070be507497",
      number: 1,
      title: "Volumen 1",
      urlCover: "/volumes/slam-dunk01.jpg",
      synopsis: "Demo synopsis",
      publicationDate: "2021-08-03T00:00:00.000Z",
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

    prismaMock.series.count.mockResolvedValue(1);
    prismaMock.volume.create.mockResolvedValue(fakeVolume as any);

    try {
      await volumeMutations.createVolume(
        null,
        {
          seriesId: "69516360-b28c-408a-887c-b370d968a0ef",
          number: 1,
          title: "Volumen 1",
          urlCover: "/volumes/slam-dunk01.jpg",
          synopsis: "Demo synopsis",
          publicationDate: new Date("2021-08-03"),
        },
        { currentUser: null },
      );
    } catch (error) {
      expect(error).toBeInstanceOf(AuthorizationError);
      const { message, extensions } = error as AuthorizationError;
      expect(message).toBe("Forbidden action");
      expect(extensions.code).toBe("FORBIDDEN");
      expect(extensions.http).toStrictEqual({ status: 403 });
    }

    expect(prismaMock.series.count).not.toHaveBeenCalled();
    expect(prismaMock.volume.create).not.toHaveBeenCalled();
  });

  it("create volume fail if prisma fails", async () => {
    prismaMock.series.count.mockResolvedValue(1);
    prismaMock.volume.create.mockRejectedValue(null);

    try {
      await volumeMutations.createVolume(
        null,
        {
          seriesId: "69516360-b28c-408a-887c-000000000000",
          number: 1,
          title: "Volumen 1",
          urlCover: "/volumes/slam-dunk01.jpg",
          synopsis: "Demo synopsis",
          publicationDate: new Date("2021-08-03"),
        },
        { currentUser: fakeUserPayload },
      );
    } catch (error) {
      expect(error).toBeInstanceOf(GraphQLError);
      const { message, extensions } = error as GraphQLError;
      expect(message).toBe("Create Volume Mutation failed");
      expect(extensions.code).toBe("INTERNAL_SERVER_ERROR");
    }

    expect(prismaMock.series.count).toHaveBeenCalledTimes(1);
    expect(prismaMock.volume.create).toHaveBeenCalledTimes(1);
  });
});

describe("volume mutations - update", () => {
  it("update volume successfully", async () => {
    const fakeVolume: TestVolume = {
      id: "ee05a8ab-3a1c-4463-bbb5-3070be507497",
      number: 1,
      title: "Volumen 1",
      urlCover: "/volumes/slam-dunk01.jpg",
      synopsis: "Demo synopsis",
      publicationDate: "2021-08-03T00:00:00.000Z",
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

    prismaMock.volume.update.mockResolvedValue(fakeVolume as any);

    const result = await volumeMutations.updateVolume(
      null,
      {
        id: "ee05a8ab-3a1c-4463-bbb5-3070be507497",
        input: {
          title: "Tomo 1",
        },
      },
      { currentUser: fakeUserPayload },
    );

    expect(result).toBe(fakeVolume);
    expect(prismaMock.volume.update).toHaveBeenCalledTimes(1);
    expect(prismaMock.volume.update).toHaveBeenCalledWith({
      where: {
        id: "ee05a8ab-3a1c-4463-bbb5-3070be507497",
      },
      data: {
        title: "Tomo 1",
      },
      include: {
        series: true,
      },
      omit: {
        createdAt: true,
        updatedAt: true,
      },
    });
  });

  it("update volume fail if missing currentUser", async () => {
    const fakeVolume: TestVolume = {
      id: "ee05a8ab-3a1c-4463-bbb5-3070be507497",
      number: 1,
      title: "Volumen 1",
      urlCover: "/volumes/slam-dunk01.jpg",
      synopsis: "Demo synopsis",
      publicationDate: "2021-08-03T00:00:00.000Z",
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

    prismaMock.volume.update.mockResolvedValue(fakeVolume as any);

    try {
      await volumeMutations.updateVolume(
        null,
        {
          id: "ee05a8ab-3a1c-4463-bbb5-3070be507497",
          input: {
            title: "Tomo 1",
          },
        },
        { currentUser: null },
      );
    } catch (error) {
      expect(error).toBeInstanceOf(AuthorizationError);
      const { message, extensions } = error as AuthorizationError;
      expect(message).toBe("Forbidden action");
      expect(extensions.code).toBe("FORBIDDEN");
      expect(extensions.http).toStrictEqual({ status: 403 });
    }

    expect(prismaMock.volume.update).not.toHaveBeenCalled();
  });

  it("update volume fail if prisma fails", async () => {
    prismaMock.volume.update.mockRejectedValue(null);

    try {
      await volumeMutations.updateVolume(
        null,
        {
          id: "ee05a8ab-3a1c-4463-bbb5-3070be507497",
          input: {
            title: "Tomo 1",
          },
        },
        { currentUser: fakeUserPayload },
      );
    } catch (error) {
      expect(error).toBeInstanceOf(GraphQLError);
      const { message, extensions } = error as GraphQLError;
      expect(message).toBe("Update Volume Mutation failed");
      expect(extensions.code).toBe("INTERNAL_SERVER_ERROR");
    }

    expect(prismaMock.volume.update).toHaveBeenCalledTimes(1);
  });
});
