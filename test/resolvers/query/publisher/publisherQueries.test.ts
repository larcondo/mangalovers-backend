import { prismaMock } from "@test/jest.setup";
import publisherQueries from "@/resolvers/query/publisher";
import { Publisher } from "generated/prisma/client";
import { GraphQLError } from "graphql";

type TPublisher = Omit<Publisher, "createdAt" | "updatedAt">;

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
    const fakePublishers: TPublisher[] = [
      { id: 1, name: "Ivrea" },
      { id: 2, name: "Panini" },
      { id: 3, name: "Ovni Press" },
    ];

    prismaMock.publisher.findMany.mockResolvedValue(fakePublishers as any);

    const result = await publisherQueries.allPublishers();

    expect(result.length).toBe(fakePublishers.length);
    expect(result).toBe(fakePublishers);
    expect(prismaMock.publisher.findMany).toHaveBeenCalledTimes(1);
    expect(prismaMock.publisher.findMany).toHaveBeenCalledWith({
      orderBy: {
        createdAt: "desc",
      },
      omit: {
        createdAt: true,
        updatedAt: true,
      },
    });
  });

  it("all publishers fail if prisma fail", async () => {
    prismaMock.publisher.findMany.mockRejectedValue(null);

    try {
      await publisherQueries.allPublishers();
    } catch (error) {
      expect(error).toBeInstanceOf(GraphQLError);
      const { message } = error as GraphQLError;
      expect(message).toBe("Get All Publishers failed");
    }
    expect(prismaMock.publisher.findMany).toHaveBeenCalledTimes(1);
  });
});
