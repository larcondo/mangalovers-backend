import { prismaMock } from "@test/jest.setup";
import publisherQueries from "@/resolvers/query/publisher";
import { Publisher } from "generated/prisma/client";

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
});
