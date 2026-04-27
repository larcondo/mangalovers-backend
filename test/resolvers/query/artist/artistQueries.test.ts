import { prismaMock } from "@test/jest.setup";
import artistQueries from "@/resolvers/query/artist";
import { GraphQLError } from "graphql";
import { artistSelect } from "@constants/index";
import { ARTISTS_PAGE_LIMIT } from "@config/patination";

describe("artist queries", () => {
  // Reset prismaMock beforeEach in jest.setup.ts

  it("artist quantity", async () => {
    const fakeQty = 5;

    prismaMock.artist.count.mockResolvedValue(fakeQty);

    const result = await artistQueries.artistQty();

    expect(result).toBe(fakeQty);
    expect(prismaMock.artist.count).toHaveBeenCalledTimes(1);
  });

  it("artist quantity fail if prisma fail", async () => {
    prismaMock.artist.count.mockRejectedValue(null);

    try {
      await artistQueries.artistQty();
    } catch (error) {
      expect(error).toBeInstanceOf(GraphQLError);
      const { message } = error as GraphQLError;
      expect(message).toBe("Get Artist Quantity failed");
    }
    expect(prismaMock.artist.count).toHaveBeenCalledTimes(1);
  });

  it("all artists", async () => {
    const fakeArtists: ArtistBasic[] = [
      {
        id: 1,
        name: "Hajime Isayama",
      },
      {
        id: 2,
        name: "Tite Kubo",
      },
    ];

    prismaMock.artist.count.mockResolvedValue(fakeArtists.length);
    prismaMock.artist.findMany.mockResolvedValue(fakeArtists as any);

    const result = await artistQueries.allArtists(null, { page: 1 });

    expect(result).toBeDefined();
    if (result) {
      const { artists, pagination } = result;
      expect(pagination).toBeDefined();
      expect(artists.length).toBe(2);
      expect(artists).toBe(fakeArtists);
      expect(pagination.page).toBe(1);
      expect(pagination.offset).toBe(0);
      expect(pagination.totalPages).toBe(1);
      expect(pagination.totalEntries).toBe(fakeArtists.length);
      expect(pagination.hasNextPage).toBe(false);
      expect(pagination.nextPage).toBeNull();
    }
    expect(prismaMock.artist.count).toHaveBeenCalledTimes(1);
    expect(prismaMock.artist.findMany).toHaveBeenCalledTimes(1);
    expect(prismaMock.artist.findMany).toHaveBeenCalledWith({
      select: artistSelect,
      take: ARTISTS_PAGE_LIMIT,
      skip: 0,
      orderBy: {
        createdAt: "desc",
      },
    });
  });

  it("all artists fail if prisma fail", async () => {
    prismaMock.artist.findMany.mockRejectedValue(null);

    try {
      await artistQueries.allArtists(null, { page: 1 });
    } catch (error) {
      expect(error).toBeInstanceOf(GraphQLError);
      const { message } = error as GraphQLError;
      expect(message).toBe("Get All Artists failed");
    }
    expect(prismaMock.artist.findMany).toHaveBeenCalledTimes(1);
  });

  it("search artists", async () => {
    const fakeArtists: ArtistBasic[] = [
      {
        id: 1,
        name: "Hajime Isayama",
      },
    ];

    prismaMock.artist.findMany.mockResolvedValue(fakeArtists as any);

    const result = await artistQueries.searchArtists(null, {
      query: "ISAyama",
    });

    expect(result).toBeDefined();
    if (result) {
      expect(result.length).toBe(1);
      expect(result).toBe(fakeArtists);
    }
    expect(prismaMock.artist.findMany).toHaveBeenCalledTimes(1);
    expect(prismaMock.artist.findMany).toHaveBeenCalledWith({
      where: {
        name: {
          contains: "isayama",
          mode: "insensitive",
        },
      },
      select: artistSelect,
    });
  });

  it("search artists fail if prisma fails", async () => {
    prismaMock.artist.findMany.mockRejectedValue(null);

    try {
      await artistQueries.searchArtists(null, { query: "ISAyama" });
    } catch (error) {
      expect(error).toBeInstanceOf(GraphQLError);
      const { message } = error as GraphQLError;
      expect(message).toBe("Search Artists failed");
    }
    expect(prismaMock.artist.findMany).toHaveBeenCalledTimes(1);
  });
});
