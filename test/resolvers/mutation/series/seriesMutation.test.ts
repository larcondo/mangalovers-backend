import { prismaMock, fakeUserPayload } from "@test/jest.setup";
import seriesMutation from "@/resolvers/mutation/series";
import { AuthorizationError } from "@/helpers/auth";
import { GraphQLError } from "graphql";
import { UserInputError } from "@/helpers/clientErrors";

describe("series mutations - create", () => {
  it("create series successfully", async () => {
    const fakeSeries: TestSeries = {
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
    };

    prismaMock.series.create.mockResolvedValue(fakeSeries as any);

    const result = await seriesMutation.createSeries(
      null,
      {
        name: "Slam Dunk",
        writerId: "1",
        illustratorId: "1",
        publisherId: "1",
        printFormatId: "1",
        urlCover: "/series/slam-dunk.jpg",
      },
      { currentUser: fakeUserPayload },
    );

    expect(result).toBe(fakeSeries);
    expect(prismaMock.series.create).toHaveBeenCalledTimes(1);
    expect(prismaMock.series.create).toHaveBeenCalledWith({
      data: {
        name: fakeSeries.name,
        illustratorId: fakeSeries.illustrator.id,
        writerId: fakeSeries.writer.id,
        printFormatId: fakeSeries.printFormat.id,
        publisherId: fakeSeries.publisher.id,
        isSingleVolume: undefined,
        urlCover: fakeSeries.urlCover,
      },
      include: {
        illustrator: true,
        writer: true,
        printFormat: true,
        publisher: true,
      },
      omit: {
        createdAt: true,
        updatedAt: true,
      },
    });
  });

  it("create series fail if missing currentUser", async () => {
    const fakeSeries: TestSeries = {
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
    };

    prismaMock.series.create.mockResolvedValue(fakeSeries as any);

    try {
      await seriesMutation.createSeries(
        null,
        {
          name: "Slam Dunk",
          writerId: "1",
          illustratorId: "1",
          publisherId: "1",
          printFormatId: "1",
          urlCover: "/series/slam-dunk.jpg",
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

    expect(prismaMock.series.create).not.toHaveBeenCalled();
  });

  it("create fail if illustratorId arg is not Int", async () => {
    prismaMock.series.create.mockResolvedValue({} as any);

    try {
      await seriesMutation.createSeries(
        null,
        {
          name: "Slam Dunk",
          writerId: "1",
          illustratorId: "asdas",
          publisherId: "1",
          printFormatId: "1",
          urlCover: "/series/slam-dunk.jpg",
        },
        { currentUser: fakeUserPayload },
      );
    } catch (error) {
      expect(error).toBeInstanceOf(UserInputError);
      const { message, extensions } = error as UserInputError;
      expect(message).toBe("Invalid illustratorId format. Must be Integer");
      expect(extensions.field).toBe("illustratorId");
      expect(extensions.http).toStrictEqual({ status: 400 });
    }
    expect(prismaMock.series.create).not.toHaveBeenCalled();
  });

  it("create fail if writerId arg is not Int", async () => {
    prismaMock.series.create.mockResolvedValue({} as any);

    try {
      await seriesMutation.createSeries(
        null,
        {
          name: "Slam Dunk",
          writerId: "a1",
          illustratorId: "1",
          publisherId: "1",
          printFormatId: "1",
          urlCover: "/series/slam-dunk.jpg",
        },
        { currentUser: fakeUserPayload },
      );
    } catch (error) {
      expect(error).toBeInstanceOf(UserInputError);
      const { message, extensions } = error as UserInputError;
      expect(message).toBe("Invalid writerId format. Must be Integer");
      expect(extensions.field).toBe("writerId");
      expect(extensions.http).toStrictEqual({ status: 400 });
    }
    expect(prismaMock.series.create).not.toHaveBeenCalled();
  });

  it("create fail if printFormatId arg is not Int", async () => {
    prismaMock.series.create.mockResolvedValue({} as any);

    try {
      await seriesMutation.createSeries(
        null,
        {
          name: "Slam Dunk",
          writerId: "1",
          illustratorId: "1",
          publisherId: "1",
          printFormatId: "kxif",
          urlCover: "/series/slam-dunk.jpg",
        },
        { currentUser: fakeUserPayload },
      );
    } catch (error) {
      expect(error).toBeInstanceOf(UserInputError);
      const { message, extensions } = error as UserInputError;
      expect(message).toBe("Invalid printFormatId format. Must be Integer");
      expect(extensions.field).toBe("printFormatId");
      expect(extensions.http).toStrictEqual({ status: 400 });
    }
    expect(prismaMock.series.create).not.toHaveBeenCalled();
  });

  it("create fail if publisherId arg is not Int", async () => {
    prismaMock.series.create.mockResolvedValue({} as any);

    try {
      await seriesMutation.createSeries(
        null,
        {
          name: "Slam Dunk",
          writerId: "1",
          illustratorId: "1",
          publisherId: "auygxc",
          printFormatId: "1",
          urlCover: "/series/slam-dunk.jpg",
        },
        { currentUser: fakeUserPayload },
      );
    } catch (error) {
      expect(error).toBeInstanceOf(UserInputError);
      const { message, extensions } = error as UserInputError;
      expect(message).toBe("Invalid publisherId format. Must be Integer");
      expect(extensions.field).toBe("publisherId");
      expect(extensions.http).toStrictEqual({ status: 400 });
    }
    expect(prismaMock.series.create).not.toHaveBeenCalled();
  });

  it("create series fail if prisma fail", async () => {
    prismaMock.series.create.mockRejectedValue(null);

    try {
      await seriesMutation.createSeries(
        null,
        {
          name: "Slam Dunk",
          writerId: "1",
          illustratorId: "1",
          publisherId: "1",
          printFormatId: "1",
          urlCover: "/series/slam-dunk.jpg",
        },
        { currentUser: fakeUserPayload },
      );
    } catch (error) {
      expect(error).toBeInstanceOf(GraphQLError);
      const { message, extensions } = error as GraphQLError;
      expect(message).toBe("Create Series Mutation failed");
      expect(extensions.code).toBe("INTERNAL_SERVER_ERROR");
    }

    expect(prismaMock.series.create).toHaveBeenCalledTimes(1);
  });
});

describe("series mutations - update", () => {
  it("update series successfully", async () => {
    const fakeSeries: TestSeries = {
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
        id: 2,
        name: "Panini",
      },
      printFormat: {
        id: 1,
        name: "B6 doble",
        description: "B6 con doble cantidad de páginas",
      },
    };

    prismaMock.series.update.mockResolvedValue(fakeSeries as any);

    const result = await seriesMutation.updateSeries(
      null,
      {
        id: "69516360-b28c-408a-887c-b370d968a0ef",
        input: {
          publisherId: "2",
        },
      },
      { currentUser: fakeUserPayload },
    );

    expect(result).toBe(fakeSeries);
    expect(prismaMock.series.update).toHaveBeenCalledTimes(1);
    expect(prismaMock.series.update).toHaveBeenCalledWith({
      where: {
        id: "69516360-b28c-408a-887c-b370d968a0ef",
      },
      data: {
        publisherId: 2,
      },
      include: {
        writer: true,
        illustrator: true,
        printFormat: true,
        publisher: true,
      },
      omit: {
        createdAt: true,
        updatedAt: true,
      },
    });
  });

  it("update series fail if illustatorId arg is not Int", async () => {
    prismaMock.series.update.mockResolvedValue({} as any);

    try {
      await seriesMutation.updateSeries(
        null,
        {
          id: "69516360-b28c-408a-887c-b370d968a0ef",
          input: {
            name: "Slam Dunk",
            writerId: "1",
            illustratorId: "asdas",
            publisherId: "1",
            printFormatId: "1",
            urlCover: "/series/slam-dunk.jpg",
          },
        },
        { currentUser: fakeUserPayload },
      );
    } catch (error) {
      expect(error).toBeInstanceOf(UserInputError);
      const { message, extensions } = error as UserInputError;
      expect(message).toBe(
        "Invalid illustratorId format. Must be Integer. Received: asdas",
      );
      expect(extensions.field).not.toBeDefined();
      expect(extensions.http).toStrictEqual({ status: 400 });
    }
    expect(prismaMock.series.update).not.toHaveBeenCalled();
  });

  it("update series fail if writerId arg is not Int", async () => {
    prismaMock.series.update.mockResolvedValue({} as any);

    try {
      await seriesMutation.updateSeries(
        null,
        {
          id: "69516360-b28c-408a-887c-b370d968a0ef",
          input: {
            name: "Slam Dunk",
            writerId: "asdas",
            illustratorId: "1",
            publisherId: "1",
            printFormatId: "1",
            urlCover: "/series/slam-dunk.jpg",
          },
        },
        { currentUser: fakeUserPayload },
      );
    } catch (error) {
      expect(error).toBeInstanceOf(UserInputError);
      const { message, extensions } = error as UserInputError;
      expect(message).toBe(
        "Invalid writerId format. Must be Integer. Received: asdas",
      );
      expect(extensions.field).not.toBeDefined();
      expect(extensions.http).toStrictEqual({ status: 400 });
    }
    expect(prismaMock.series.update).not.toHaveBeenCalled();
  });

  it("update series fail if printFormatId arg is not Int", async () => {
    prismaMock.series.update.mockResolvedValue({} as any);

    try {
      await seriesMutation.updateSeries(
        null,
        {
          id: "69516360-b28c-408a-887c-b370d968a0ef",
          input: {
            name: "Slam Dunk",
            writerId: "1",
            illustratorId: "1",
            publisherId: "1",
            printFormatId: "asdas",
            urlCover: "/series/slam-dunk.jpg",
          },
        },
        { currentUser: fakeUserPayload },
      );
    } catch (error) {
      expect(error).toBeInstanceOf(UserInputError);
      const { message, extensions } = error as UserInputError;
      expect(message).toBe(
        "Invalid printFormatId format. Must be Integer. Received: asdas",
      );
      expect(extensions.field).not.toBeDefined();
      expect(extensions.http).toStrictEqual({ status: 400 });
    }
    expect(prismaMock.series.update).not.toHaveBeenCalled();
  });

  it("update series fail if publisherId arg is not Int", async () => {
    prismaMock.series.update.mockResolvedValue({} as any);

    try {
      await seriesMutation.updateSeries(
        null,
        {
          id: "69516360-b28c-408a-887c-b370d968a0ef",
          input: {
            name: "Slam Dunk",
            writerId: "1",
            illustratorId: "1",
            publisherId: "asdas",
            printFormatId: "1",
            urlCover: "/series/slam-dunk.jpg",
          },
        },
        { currentUser: fakeUserPayload },
      );
    } catch (error) {
      expect(error).toBeInstanceOf(UserInputError);
      const { message, extensions } = error as UserInputError;
      expect(message).toBe(
        "Invalid publisherId format. Must be Integer. Received: asdas",
      );
      expect(extensions.field).not.toBeDefined();
      expect(extensions.http).toStrictEqual({ status: 400 });
    }
    expect(prismaMock.series.update).not.toHaveBeenCalled();
  });

  it("update series fail if missing currentUser", async () => {
    const fakeSeries: TestSeries = {
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
        id: 2,
        name: "Panini",
      },
      printFormat: {
        id: 1,
        name: "B6 doble",
        description: "B6 con doble cantidad de páginas",
      },
    };

    prismaMock.series.update.mockResolvedValue(fakeSeries as any);

    try {
      await seriesMutation.updateSeries(
        null,
        {
          id: "69516360-b28c-408a-887c-b370d968a0ef",
          input: {
            publisherId: "2",
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
    expect(prismaMock.series.update).not.toHaveBeenCalled();
  });

  it("update series fail if prisma fail", async () => {
    prismaMock.series.update.mockRejectedValue(null);

    try {
      await seriesMutation.updateSeries(
        null,
        {
          id: "69516360-b28c-408a-887c-b370d968a0ef",
          input: {
            publisherId: "2",
          },
        },
        { currentUser: fakeUserPayload },
      );
    } catch (error) {
      expect(error).toBeInstanceOf(GraphQLError);
      const { message, extensions } = error as GraphQLError;
      expect(message).toBe("Update Series Mutation failed");
      expect(extensions.code).toBe("INTERNAL_SERVER_ERROR");
    }
    expect(prismaMock.series.update).toHaveBeenCalledTimes(1);
  });
});
