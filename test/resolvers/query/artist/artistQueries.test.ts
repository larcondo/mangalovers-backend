import { prismaMock } from "@test/jest.setup";
import artistQueries from "@/resolvers/query/artist";
import { GraphQLError } from "graphql";

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

    prismaMock.artist.findMany.mockResolvedValue(fakeArtists as any);

    const result = await artistQueries.allArtists();

    expect(result.length).toBe(2);
    expect(result).toBe(fakeArtists);
    expect(prismaMock.artist.findMany).toHaveBeenCalledTimes(1);
    expect(prismaMock.artist.findMany).toHaveBeenCalledWith({
      orderBy: {
        createdAt: "desc",
      },
      omit: {
        createdAt: true,
        updatedAt: true,
      },
    });
  });

  it("all artists fail if prisma fail", async () => {
    prismaMock.artist.findMany.mockRejectedValue(null);

    try {
      await artistQueries.allArtists();
    } catch (error) {
      expect(error).toBeInstanceOf(GraphQLError);
      const { message } = error as GraphQLError;
      expect(message).toBe("Get All Artists failed");
    }
    expect(prismaMock.artist.findMany).toHaveBeenCalledTimes(1);
  });
});
