import { prisma } from "@/prisma";
import request from "supertest";
import app from "@/app";
import { server } from "@/server";
import { AuthService } from "@services/auth";
import MUTATIONS from "./mutations";
import QUERIES from "./queries";
import { expressMiddleware } from "@as-integrations/express5";
import { apolloContext } from "@/context";

describe("GraphQL Endpoints", () => {
  let seriesId: string;
  // Matches ISO format
  const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;

  const testAdminUser = {
    username: "dummyuser",
    email: "dummy.user@gmail.com",
    password: "sekretito",
  };

  beforeAll(async () => {
    await prisma.$connect();
    await prisma.userSeries.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.volume.deleteMany({});
    await prisma.series.deleteMany({});
    await prisma.artist.deleteMany({});
    await prisma.printFormat.deleteMany({});
    await prisma.publisher.deleteMany({});

    // Creo temporalmente ADMIN al este usuario para el test [TODO: como hacerlo en la app]
    await prisma.user.create({
      data: {
        username: testAdminUser.username,
        email: testAdminUser.email,
        password: await AuthService.hashPassword(testAdminUser.password),
        role: 10,
      },
    });

    // Start Apollo Server
    await server.start();

    // Set up express integration with apollo server
    app.use("/graphql", expressMiddleware(server, { context: apolloContext }));
  });

  afterAll(async () => {
    await prisma.$disconnect();
    await server.stop();
  });

  it("should create a new user", async () => {
    const variables = {
      username: "demou",
      password: "sekret1",
      email: "dummy@gmail.com",
    };

    const response = await request(app).post("/graphql").send({
      query: MUTATIONS.REGISTER,
      variables,
    });

    expect(response.status).toBe(200);
    const { body } = response;
    expect(body).toBeDefined();
    expect(body.errors).toBeUndefined();
    expect(body.data).toBeDefined();
    expect(body.data.createUser).toStrictEqual({
      username: variables.username,
      email: variables.email,
    });
  });

  it("should login a user", async () => {
    const variables = { username: "demou", password: "sekret1" };

    const response = await request(app).post("/graphql").send({
      query: MUTATIONS.LOGIN,
      variables,
    });

    expect(response.status).toBe(200);
    const { body } = response;
    expect(body).toBeDefined();
    expect(body.errors).toBeUndefined();
    expect(body.data).toBeDefined();
    expect(body.data.login.username).toBe(variables.username);
    expect(body.data.login.email).toBe("dummy@gmail.com");
    expect(body.data.login.isAdmin).toBe(false);
    expect(body.data.login.accessToken).toBeDefined();
    expect(body.data.login.accessToken.length).toBeGreaterThan(10);
    expect(Object.keys(body.data.login).length).toBe(4);
  });

  describe("Artist Endpoints", () => {
    let userToken: string;

    beforeAll(async () => {
      // To reset auto-incrementing ID sequences.
      await prisma.$executeRawUnsafe(
        'TRUNCATE TABLE "Artist" RESTART IDENTITY CASCADE;',
      );

      // login (para el token)
      const {
        body: { data },
      } = await request(app)
        .post("/graphql")
        .send({
          query: MUTATIONS.LOGIN,
          variables: {
            username: testAdminUser.username,
            password: testAdminUser.password,
          },
        });

      userToken = data.login.accessToken;
    });

    it("should create an artist", async () => {
      const variables = { name: "Takehiko Inoue" };
      const response = await request(app)
        .post("/graphql")
        .set("Authorization", `Bearer ${userToken}`)
        .send({ query: MUTATIONS.CREATE_ARTIST, variables });

      expect(response.status).toBe(200);
      const { body } = response;
      expect(body).toBeDefined();
      expect(body.errors).toBeUndefined();
      expect(body.data.createArtist).toStrictEqual({
        id: "1",
        name: variables.name,
      });
    });

    it("should return artist qty", async () => {
      const response = await request(app).post("/graphql").send({
        query: QUERIES.ARTIST_QTY,
      });

      const {
        body: { errors, data },
      } = response;
      expect(response.status).toBe(200);
      expect(errors).toBeUndefined();
      expect(data.artistQty).toBeDefined();
      expect(data.artistQty).toBe(1);
    });

    it("should return all artists", async () => {
      const response = await request(app).post("/graphql").send({
        query: QUERIES.ALL_ARTISTS,
        variables: { page: 1 },
      });

      const {
        body: { errors, data },
      } = response;

      expect(response.status).toBe(200);
      expect(errors).toBeUndefined();
      expect(data.allArtists).toBeDefined();
      const { artists, pagination } = data.allArtists;
      expect(artists).toBeDefined();
      expect(pagination).toBeDefined();
      expect(artists.length).toBe(1);
      expect(artists[0]).toStrictEqual({
        id: "1",
        name: "Takehiko Inoue",
      });
      expect(pagination).toStrictEqual({
        page: 1,
        totalPages: 1,
        totalEntries: 1,
        offset: 0,
        hasNextPage: false,
        nextPage: null,
      });
    });

    it("should update an existing artist", async () => {
      const variables = { id: "1", input: { name: "Inoue Takehiko" } };
      const response = await request(app)
        .post("/graphql")
        .set("Authorization", `Bearer ${userToken}`)
        .send({ query: MUTATIONS.UPDATE_ARTIST, variables });

      expect(response.status).toBe(200);
      const { body } = response;
      expect(body).toBeDefined();
      expect(body.errors).toBeUndefined();
      expect(body.data).toEqual({
        updateArtist: {
          id: variables.id,
          name: variables.input.name,
        },
      });
    });
  });

  describe("Publisher Endpoints", () => {
    let userToken: string;

    beforeAll(async () => {
      // To reset auto-incrementing ID sequences.
      await prisma.$executeRawUnsafe(
        'TRUNCATE TABLE "Publisher" RESTART IDENTITY CASCADE;',
      );

      // login (para el token)
      const {
        body: { data },
      } = await request(app)
        .post("/graphql")
        .send({
          query: MUTATIONS.LOGIN,
          variables: {
            username: testAdminUser.username,
            password: testAdminUser.password,
          },
        });

      userToken = data.login.accessToken;
    });

    it("should create a publisher", async () => {
      const variables = { name: "Ovni Press" };
      const response = await request(app)
        .post("/graphql")
        .set("Authorization", `Bearer ${userToken}`)
        .send({ query: MUTATIONS.CREATE_PUBLISHER, variables });

      expect(response.status).toBe(200);
      const { body } = response;
      expect(body).toBeDefined();
      expect(body.errors).toBeUndefined();
      expect(body.data).toEqual({
        createPublisher: {
          id: "1",
          name: variables.name,
        },
      });
    });

    it("should return publisher qty", async () => {
      const response = await request(app).post("/graphql").send({
        query: QUERIES.PUBLISHER_QTY,
      });

      const {
        body: { errors, data },
      } = response;
      expect(response.status).toBe(200);
      expect(errors).toBeUndefined();
      expect(data.publisherQty).toBeDefined();
      expect(data.publisherQty).toBe(1);
    });

    it("should return all publishers", async () => {
      const response = await request(app).post("/graphql").send({
        query: QUERIES.ALL_PUBLISHERS,
        variables: { page: 1 },
      });

      const {
        body: { errors, data },
      } = response;
      expect(response.status).toBe(200);
      expect(errors).toBeUndefined();
      expect(data.allPublishers).toBeDefined();
      const { publishers, pagination } = data.allPublishers;
      expect(publishers).toBeDefined();
      expect(pagination).toBeDefined();
      expect(publishers.length).toBe(1);
      expect(publishers[0]).toStrictEqual({
        id: "1",
        name: "Ovni Press",
      });
      expect(pagination).toStrictEqual({
        page: 1,
        totalPages: 1,
        totalEntries: 1,
        offset: 0,
        hasNextPage: false,
        nextPage: null,
      });
    });

    it("should update an existing publisher", async () => {
      const variables = { id: "1", input: { name: "Ivrea" } };
      const response = await request(app)
        .post("/graphql")
        .set("Authorization", `Bearer ${userToken}`)
        .send({ query: MUTATIONS.UPDATE_PUBLISHER, variables });

      expect(response.status).toBe(200);
      const { body } = response;
      expect(body).toBeDefined();
      expect(body.errors).toBeUndefined();
      expect(body.data).toEqual({
        updatePublisher: {
          id: variables.id,
          name: variables.input.name,
        },
      });
    });
  });

  describe("PrintFormat Endpoints", () => {
    let userToken: string;

    beforeAll(async () => {
      // To reset auto-incrementing ID sequences.
      await prisma.$executeRawUnsafe(
        'TRUNCATE TABLE "PrintFormat" RESTART IDENTITY CASCADE;',
      );

      // login (para el token)
      const {
        body: { data },
      } = await request(app)
        .post("/graphql")
        .send({
          query: MUTATIONS.LOGIN,
          variables: {
            username: testAdminUser.username,
            password: testAdminUser.password,
          },
        });

      userToken = data.login.accessToken;
    });

    it("should create a print format", async () => {
      const variables = {
        name: "Tankobon",
        description: "Tamaño más pequeño",
      };

      const response = await request(app)
        .post("/graphql")
        .set("Authorization", `Bearer ${userToken}`)
        .send({ query: MUTATIONS.CREATE_PRINT_FORMAT, variables });

      expect(response.status).toBe(200);
      const { body } = response;
      expect(body).toBeDefined();
      expect(body.errors).toBeUndefined();
      expect(body.data).toEqual({
        createPrintFormat: {
          id: "1",
          name: variables.name,
          description: variables.description,
        },
      });
    });

    it("should return printFormat qty", async () => {
      const response = await request(app).post("/graphql").send({
        query: QUERIES.PRINT_FORMAT_QTY,
      });

      const {
        body: { errors, data },
      } = response;
      expect(response.status).toBe(200);
      expect(errors).toBeUndefined();
      expect(data.printFormatQty).toBeDefined();
      expect(data.printFormatQty).toBe(1);
    });

    it("should return all printFormats", async () => {
      const response = await request(app).post("/graphql").send({
        query: QUERIES.ALL_PRINT_FORMATS,
        variables: { page: 1 },
      });

      const {
        body: { errors, data },
      } = response;
      expect(response.status).toBe(200);
      expect(errors).toBeUndefined();
      expect(data.allPrintFormats).toBeDefined();
      const { printFormats, pagination } = data.allPrintFormats;
      expect(printFormats).toBeDefined();
      expect(pagination).toBeDefined();
      expect(printFormats.length).toBe(1);
      expect(printFormats[0]).toStrictEqual({
        id: "1",
        name: "Tankobon",
        description: "Tamaño más pequeño",
      });
      expect(pagination).toStrictEqual({
        page: 1,
        totalPages: 1,
        totalEntries: 1,
        offset: 0,
        hasNextPage: false,
        nextPage: null,
      });
    });

    it("should update an existing printFormat", async () => {
      const variables = { id: "1", input: { name: "Tankoubon" } };
      const response = await request(app)
        .post("/graphql")
        .set("Authorization", `Bearer ${userToken}`)
        .send({ query: MUTATIONS.UPDATE_PRINT_FORMAT, variables });

      expect(response.status).toBe(200);
      const { body } = response;
      expect(body).toBeDefined();
      expect(body.errors).toBeUndefined();
      expect(body.data).toEqual({
        updatePrintFormat: {
          id: variables.id,
          name: variables.input.name,
          description: "Tamaño más pequeño",
        },
      });
    });
  });

  describe("Series Endpoints", () => {
    let userToken: string;

    beforeAll(async () => {
      // // To reset auto-incrementing ID sequences.
      // await prisma.$executeRawUnsafe(
      //   'TRUNCATE TABLE "Series" RESTART IDENTITY CASCADE;',
      // );

      // login (para el token)
      const {
        body: { data },
      } = await request(app)
        .post("/graphql")
        .send({
          query: MUTATIONS.LOGIN,
          variables: {
            username: testAdminUser.username,
            password: testAdminUser.password,
          },
        });

      userToken = data.login.accessToken;
    });

    it("should create a series", async () => {
      const variables = {
        name: "Slam Dunk",
        writerId: "1",
        illustratorId: "1",
        publisherId: "1",
        printFormatId: "1",
        urlCover: "/series/slam-dunk.jpg",
        isSingleVolume: false,
      };

      const response = await request(app)
        .post("/graphql")
        .set("Authorization", `Bearer ${userToken}`)
        .send({ query: MUTATIONS.CREATE_SERIES, variables });

      expect(response.status).toBe(200);
      const { body } = response;
      expect(body).toBeDefined();
      expect(body.errors).toBeUndefined();
      expect(body.data.createSeries.id).toBeDefined();
      expect(body.data.createSeries.publisher).toStrictEqual({
        id: "1",
        name: "Ivrea",
      });
      expect(body.data.createSeries.author.writer).toStrictEqual({
        id: "1",
        name: "Inoue Takehiko",
      });
      expect(body.data.createSeries.author.illustrator).toStrictEqual({
        id: "1",
        name: "Inoue Takehiko",
      });
      expect(body.data.createSeries.printFormat).toStrictEqual({
        id: "1",
        name: "Tankoubon",
        description: "Tamaño más pequeño",
      });
      expect(body.data.createSeries.name).toBe(variables.name);
      expect(body.data.createSeries.urlCover).toBe(variables.urlCover);
      expect(body.data.createSeries.isSingleVolume).toBe(
        variables.isSingleVolume,
      );
      seriesId = body.data.createSeries.id;
    });

    it("should return series qty", async () => {
      const response = await request(app).post("/graphql").send({
        query: QUERIES.SERIES_QTY,
      });

      const {
        body: { errors, data },
      } = response;
      expect(response.status).toBe(200);
      expect(errors).toBeUndefined();
      expect(data.seriesQty).toBeDefined();
      expect(data.seriesQty).toBe(1);
    });

    it("should return all series", async () => {
      const response = await request(app).post("/graphql").send({
        query: QUERIES.ALL_SERIES,
        variables: { page: 1 },
      });

      const {
        body: { errors, data },
      } = response;
      expect(response.status).toBe(200);
      expect(errors).toBeUndefined();
      expect(data.allSeries).toBeDefined();
      const { series, pagination } = data.allSeries;
      expect(series).toBeDefined();
      expect(pagination).toBeDefined();
      expect(series.length).toBe(1);
      expect(series[0].name).toBe("Slam Dunk");
      expect(pagination).toStrictEqual({
        page: 1,
        totalPages: 1,
        totalEntries: 1,
        offset: 0,
        hasNextPage: false,
        nextPage: null,
      });
    });

    it("should update an existing series", async () => {
      const variables = {
        id: seriesId,
        input: {
          name: "Slam Dunk Deluxe",
          urlCover: "/series/slam-dunk-deluxe.jpg",
        },
      };

      const response = await request(app)
        .post("/graphql")
        .set("Authorization", `Bearer ${userToken}`)
        .send({ query: MUTATIONS.UPDATE_SERIES, variables });

      expect(response.status).toBe(200);
      const { body } = response;
      expect(body).toBeDefined();
      expect(body.errors).toBeUndefined();
      expect(body.data.updateSeries.name).toBe(variables.input.name);
      expect(body.data.updateSeries.urlCover).toBe(variables.input.urlCover);
      expect(body.data.updateSeries.author.writer.id).toBe("1");
      expect(body.data.updateSeries.author.illustrator.id).toBe("1");
      expect(body.data.updateSeries.printFormat.id).toBe("1");
      expect(body.data.updateSeries.publisher.id).toBe("1");
      expect(body.data.updateSeries.isSingleVolume).toBe(false);
    });
  });

  describe("Volume Endpoints", () => {
    let userToken: string;
    let volumeId: string;

    beforeAll(async () => {
      // login (para el token)
      const {
        body: { data },
      } = await request(app)
        .post("/graphql")
        .send({
          query: MUTATIONS.LOGIN,
          variables: {
            username: testAdminUser.username,
            password: testAdminUser.password,
          },
        });

      userToken = data.login.accessToken;
    });

    it("should create a volume", async () => {
      const variables = {
        seriesId,
        number: 1,
        title: "Volumen 1",
        urlCover: "/volumes/slam-dunk01.jpg",
        synopsis: "This is a test synopsis...",
        publicationDate: "2024-03-14",
      };

      const response = await request(app)
        .post("/graphql")
        .set("Authorization", `Bearer ${userToken}`)
        .send({ query: MUTATIONS.CREATE_VOLUME, variables });

      expect(response.status).toBe(200);
      const { body } = response;
      expect(body).toBeDefined();
      expect(body.errors).toBeUndefined();
      expect(body.data.createVolume.number).toBe(variables.number);
      expect(body.data.createVolume.title).toBe(variables.title);
      expect(body.data.createVolume.urlCover).toBe(variables.urlCover);
      expect(body.data.createVolume.synopsis).toBe(variables.synopsis);
      expect(body.data.createVolume.publicationDate).toMatch(isoRegex);
      expect(body.data.createVolume.series.name).toBe("Slam Dunk Deluxe");

      volumeId = body.data.createVolume.id;
    });

    it("should return volume qty", async () => {
      const response = await request(app).post("/graphql").send({
        query: QUERIES.VOLUME_QTY,
      });

      const {
        body: { errors, data },
      } = response;
      expect(response.status).toBe(200);
      expect(errors).toBeUndefined();
      expect(data.volumeQty).toBeDefined();
      expect(data.volumeQty).toBe(1);
    });

    it("should return all volumes", async () => {
      const response = await request(app).post("/graphql").send({
        query: QUERIES.ALL_VOLUMES,
        variables: { page: 1 },
      });

      const {
        body: { errors, data },
      } = response;
      expect(response.status).toBe(200);
      expect(errors).toBeUndefined();
      expect(data.allVolumes).toBeDefined();
      const { volumes, pagination } = data.allVolumes;
      expect(volumes).toBeDefined();
      expect(pagination).toBeDefined();
      expect(volumes.length).toBe(1);
      expect(volumes[0].number).toBe(1);
      expect(volumes[0].title).toBe("Volumen 1");
      expect(volumes[0].publicationDate).toMatch(isoRegex);
      expect(pagination).toStrictEqual({
        page: 1,
        totalPages: 1,
        totalEntries: 1,
        offset: 0,
        hasNextPage: false,
        nextPage: null,
      });
    });

    it("should update an existing volume", async () => {
      const variables = {
        id: volumeId,
        input: {
          title: "Tomo 1",
          urlCover: "/volumes/slam-dunk-01.webp",
        },
      };

      const response = await request(app)
        .post("/graphql")
        .set("Authorization", `Bearer ${userToken}`)
        .send({ query: MUTATIONS.UPDATE_VOLUME, variables });

      expect(response.status).toBe(200);
      const { body } = response;
      expect(body).toBeDefined();
      expect(body.errors).toBeUndefined();
      const { data } = body;
      expect(data.updateVolume.id).toBe(volumeId);
      expect(data.updateVolume.number).toBe(1);
      expect(data.updateVolume.title).toBe(variables.input.title);
      expect(data.updateVolume.urlCover).toBe(variables.input.urlCover);
      expect(data.updateVolume.synopsis).toBe("This is a test synopsis...");
      expect(data.updateVolume.publicationDate).toMatch(isoRegex);
      expect(body.data.updateVolume.series.id).toBe(seriesId);
      expect(body.data.updateVolume.series.name).toBe("Slam Dunk Deluxe");
    });
  });

  describe("User Series Endpoints", () => {
    let userToken: string;

    beforeAll(async () => {
      // login (para el token)
      const {
        body: { data },
      } = await request(app)
        .post("/graphql")
        .send({
          query: MUTATIONS.LOGIN,
          variables: {
            username: testAdminUser.username,
            password: testAdminUser.password,
          },
        });

      userToken = data.login.accessToken;
    });

    it("should set a user series", async () => {
      const variables = { seriesId };

      const response = await request(app)
        .post("/graphql")
        .set("Authorization", `Bearer ${userToken}`)
        .send({ query: MUTATIONS.SET_USER_SERIES, variables });

      expect(response.status).toBe(200);

      const { body } = response;
      expect(body).toBeDefined();
      expect(body.errors).toBeUndefined();

      const { data } = body;
      expect(data.setUserSeries.id).toBe("1");
      expect(data.setUserSeries.active).toBe(true);
      expect(data.setUserSeries.activatedAt).toBeDefined();
      expect(data.setUserSeries.activatedAt).toMatch(isoRegex);
      expect(data.setUserSeries.deactivatedAt).toBeNull();
    });

    it("should return all user series", async () => {
      const response = await request(app)
        .post("/graphql")
        .set("Authorization", `Bearer ${userToken}`)
        .send({ query: QUERIES.USER_SERIES });

      expect(response.status).toBe(200);

      const { body } = response;
      expect(body).toBeDefined();
      expect(body.errors).toBeUndefined();

      const { data } = body;
      expect(data.userSeries).toBeDefined();
      expect(data.userSeries.length).toBe(1);

      const first = data.userSeries[0];
      expect(first.id).toBe("1");
      expect(first.series.id).toBe(seriesId);
      expect(first.series.name).toBe("Slam Dunk Deluxe");
      expect(first.series.author.writer).toStrictEqual({
        id: "1",
        name: "Inoue Takehiko",
      });
      expect(first.series.author.illustrator).toStrictEqual({
        id: "1",
        name: "Inoue Takehiko",
      });
      expect(first.series.publisher).toStrictEqual({
        id: "1",
        name: "Ivrea",
      });
      expect(first.series.printFormat).toStrictEqual({
        id: "1",
        name: "Tankoubon",
        description: "Tamaño más pequeño",
      });
      expect(first.series.urlCover).toBe("/series/slam-dunk-deluxe.jpg");
      expect(first.series.isSingleVolume).toBe(false);
    });

    it("should unset a user series", async () => {
      const variables = { seriesId };

      const response = await request(app)
        .post("/graphql")
        .set("Authorization", `Bearer ${userToken}`)
        .send({ query: MUTATIONS.UNSET_USER_SERIES, variables });

      expect(response.status).toBe(200);

      const { body } = response;
      expect(body).toBeDefined();
      expect(body.errors).toBeUndefined();

      const { data } = body;
      expect(data.unsetUserSeries.id).toBe("1");
      expect(data.unsetUserSeries.active).toBe(false);
      expect(data.unsetUserSeries.activatedAt).toBeDefined();
      expect(data.unsetUserSeries.activatedAt).toMatch(isoRegex);
      expect(data.unsetUserSeries.deactivatedAt).toBeDefined();
      expect(data.unsetUserSeries.deactivatedAt).toMatch(isoRegex);
    });
  });
});
