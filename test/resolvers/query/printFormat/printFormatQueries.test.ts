import { prismaMock } from "@test/jest.setup";
import printFormatQueries from "@/resolvers/query/printFormat";
import { GraphQLError } from "graphql";

describe("printFormat queries", () => {
  // Reset prismaMock beforeEach in jest.setup.ts

  it("printFormat quantity", async () => {
    const fakeQty = 8;

    prismaMock.printFormat.count.mockResolvedValue(fakeQty);

    const result = await printFormatQueries.printFormatQty();

    expect(result).toBe(fakeQty);
    expect(prismaMock.printFormat.count).toHaveBeenCalledTimes(1);
  });

  it("printFormat quantity fail if prisma fail", async () => {
    prismaMock.printFormat.count.mockRejectedValue(null);

    try {
      await printFormatQueries.printFormatQty();
    } catch (error) {
      expect(error).toBeInstanceOf(GraphQLError);
      const { message } = error as GraphQLError;
      expect(message).toBe("Get PrintFormat Quantity failed");
    }
    expect(prismaMock.printFormat.count).toHaveBeenCalledTimes(1);
  });

  it("all printFormats", async () => {
    const fakePrintFormats: PrintFormatBasic[] = [
      { id: 1, name: "Tankobon", description: "El tamaño más chico." },
      { id: 2, name: "Kanzenban", description: "Edición de lujo." },
      { id: 3, name: "B6", description: null },
    ];

    prismaMock.printFormat.findMany.mockResolvedValue(fakePrintFormats as any);

    const result = await printFormatQueries.allPrintFormats();

    expect(result).toBeDefined();
    if (result) {
      expect(result.length).toBe(fakePrintFormats.length);
      expect(result).toBe(fakePrintFormats);
    }
    expect(prismaMock.printFormat.findMany).toHaveBeenCalledTimes(1);
    expect(prismaMock.printFormat.findMany).toHaveBeenCalledWith({
      orderBy: {
        createdAt: "desc",
      },
      omit: {
        createdAt: true,
        updatedAt: true,
      },
    });
  });

  it("all printFormats fail if prisma fail", async () => {
    prismaMock.printFormat.findMany.mockRejectedValue(null);

    try {
      await printFormatQueries.allPrintFormats();
    } catch (error) {
      expect(error).toBeInstanceOf(GraphQLError);
      const { message } = error as GraphQLError;
      expect(message).toBe("Get All PrintFormats failed");
    }
    expect(prismaMock.printFormat.findMany).toHaveBeenCalledTimes(1);
  });

  it("search printFormats", async () => {
    const fakePrintFormats: PrintFormatBasic[] = [
      { id: 1, name: "Tankobon", description: "El tamaño más chico." },
    ];

    prismaMock.printFormat.findMany.mockResolvedValue(fakePrintFormats as any);

    const result = await printFormatQueries.searchPrintFormats(null, {
      query: "TANKO",
    });

    expect(result).toBeDefined();
    if (result) {
      expect(result.length).toBe(1);
      expect(result).toBe(fakePrintFormats);
    }
    expect(prismaMock.printFormat.findMany).toHaveBeenCalledTimes(1);
    expect(prismaMock.printFormat.findMany).toHaveBeenCalledWith({
      where: {
        name: {
          contains: "tanko",
          mode: "insensitive",
        },
      },
      omit: {
        createdAt: true,
        updatedAt: true,
      },
    });
  });

  it("search printFormats fail if prisma fails", async () => {
    prismaMock.printFormat.findMany.mockRejectedValue(null);

    try {
      await printFormatQueries.searchPrintFormats(null, {
        query: "TANKO",
      });
    } catch (error) {
      expect(error).toBeInstanceOf(GraphQLError);
      const { message } = error as GraphQLError;
      expect(message).toBe("Search PrintFormats failed");
    }
    expect(prismaMock.printFormat.findMany).toHaveBeenCalledTimes(1);
  });
});
