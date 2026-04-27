import { prismaMock } from "@test/jest.setup";
import publisherQueries from "@/resolvers/query/publisher";
import { GraphQLError } from "graphql";
import { publisherSelect } from "@constants/index";
import { PUBLISHERS_PAGE_LIMIT } from "@config/patination";

describe("publisher queries", () => {
  // Reset prismaMock beforeEach in jest.setup.ts

  it("publisher quantity", async () => {
    const fakeQty = 14;

    prismaMock.publisher.count.mockResolvedValue(fakeQty);

    const result = await publisherQueries.publisherQty();

    expect(result).toBe(fakeQty);
    expect(prismaMock.publisher.count).toHaveBeenCalledTimes(1);
  });

  it("publisher quantity fail if prisma fail", async () => {
    prismaMock.publisher.count.mockRejectedValue(null);

    try {
      await publisherQueries.publisherQty();
    } catch (error) {
      expect(error).toBeInstanceOf(GraphQLError);
      const { message } = error as GraphQLError;
      expect(message).toBe("Get Publisher Quantity failed");
    }
    expect(prismaMock.publisher.count).toHaveBeenCalledTimes(1);
  });

  it("all publishers", async () => {
    const fakePublishers: PublisherBasic[] = [
      { id: 1, name: "Ivrea" },
      { id: 2, name: "Panini" },
      { id: 3, name: "Ovni Press" },
    ];

    prismaMock.publisher.count.mockResolvedValue(fakePublishers.length);
    prismaMock.publisher.findMany.mockResolvedValue(fakePublishers as any);

    const result = await publisherQueries.allPublishers(null, { page: 1 });

    expect(result).toBeDefined();
    if (result) {
      const { publishers, pagination } = result;
      expect(pagination).toBeDefined();
      expect(publishers.length).toBe(fakePublishers.length);
      expect(publishers).toBe(fakePublishers);
      expect(pagination.page).toBe(1);
      expect(pagination.offset).toBe(0);
      expect(pagination.totalPages).toBe(1);
      expect(pagination.totalEntries).toBe(fakePublishers.length);
      expect(pagination.hasNextPage).toBe(false);
      expect(pagination.nextPage).toBeNull();
    }
    expect(prismaMock.publisher.count).toHaveBeenCalledTimes(1);
    expect(prismaMock.publisher.findMany).toHaveBeenCalledTimes(1);
    expect(prismaMock.publisher.findMany).toHaveBeenCalledWith({
      select: publisherSelect,
      take: PUBLISHERS_PAGE_LIMIT,
      skip: 0,
      orderBy: {
        createdAt: "desc",
      },
    });
  });

  it("all publishers fail if prisma fail", async () => {
    prismaMock.publisher.findMany.mockRejectedValue(null);

    try {
      await publisherQueries.allPublishers(null, { page: 1 });
    } catch (error) {
      expect(error).toBeInstanceOf(GraphQLError);
      const { message } = error as GraphQLError;
      expect(message).toBe("Get All Publishers failed");
    }
    expect(prismaMock.publisher.findMany).toHaveBeenCalledTimes(1);
  });

  it("search publishers", async () => {
    const fakePublishers: PublisherBasic[] = [{ id: 2, name: "Panini" }];

    prismaMock.publisher.findMany.mockResolvedValue(fakePublishers as any);

    const result = await publisherQueries.searchPublishers(null, {
      query: "Pani",
    });

    expect(result).toBeDefined();
    if (result) {
      expect(result.length).toBe(1);
      expect(result).toBe(fakePublishers);
    }
    expect(prismaMock.publisher.findMany).toHaveBeenCalledTimes(1);
    expect(prismaMock.publisher.findMany).toHaveBeenCalledWith({
      where: {
        name: {
          contains: "pani",
          mode: "insensitive",
        },
      },
      select: publisherSelect,
    });
  });

  it("search publishers fail if prisma fails", async () => {
    prismaMock.publisher.findMany.mockRejectedValue(null);

    try {
      await publisherQueries.searchPublishers(null, { query: "Pani" });
    } catch (error) {
      expect(error).toBeInstanceOf(GraphQLError);
      const { message } = error as GraphQLError;
      expect(message).toBe("Search Publishers failed");
    }
    expect(prismaMock.publisher.findMany).toHaveBeenCalledTimes(1);
  });
});
