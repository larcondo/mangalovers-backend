import { prismaMock, fakeUserPayload } from "@test/jest.setup";
import printFormatMutations from "@/resolvers/mutation/printFormat";
import { AuthorizationError } from "@/helpers/auth";
import { GraphQLError } from "graphql";

describe("printFormat mutations - create", () => {
  it("create printFormat successfully", async () => {
    const fakePrintFormat = {
      id: 1,
      name: "Tankobon",
      description: "Formato estándar",
    };

    prismaMock.printFormat.create.mockResolvedValue(fakePrintFormat as any);

    const result = await printFormatMutations.createPrintFormat(
      null,
      { name: "Takehiko Inoue", description: "Formato estándar" },
      { currentUser: fakeUserPayload },
    );

    expect(result).toBe(fakePrintFormat);
    expect(prismaMock.printFormat.create).toHaveBeenCalledTimes(1);
  });

  it("create printFormat fail if missing currentUser", async () => {
    const fakePrintFormat = {
      id: 1,
      name: "Tankobon",
      description: "Formato estándar",
    };

    prismaMock.printFormat.create.mockResolvedValue(fakePrintFormat as any);

    try {
      await printFormatMutations.createPrintFormat(
        null,
        { name: "Tankobon", description: "Formato estándar" },
        { currentUser: null },
      );
    } catch (error) {
      expect(error).toBeInstanceOf(AuthorizationError);
      const { message, extensions } = error as AuthorizationError;
      expect(message).toBe("Forbidden action");
      expect(extensions.code).toBe("FORBIDDEN");
      expect(extensions.http).toStrictEqual({ status: 403 });
    }

    expect(prismaMock.printFormat.create).not.toHaveBeenCalled();
  });

  it("create artist fail if prisma fail", async () => {
    prismaMock.printFormat.create.mockRejectedValue(null);

    try {
      await printFormatMutations.createPrintFormat(
        null,
        { name: "Tankobon", description: "Formato estándar" },
        {
          currentUser: fakeUserPayload,
        },
      );
    } catch (error) {
      expect(error).toBeInstanceOf(GraphQLError);
      const { message, extensions } = error as GraphQLError;
      expect(message).toBe("Create PrintFormat Mutation failed");
      expect(extensions.code).toBe("INTERNAL_SERVER_ERROR");
    }
    expect(prismaMock.printFormat.create).toHaveBeenCalledTimes(1);
  });
});

describe("printFormat mutations - update", () => {
  it("update printFormat successfully", async () => {
    const fakePrintFormat = { id: 1, name: "Tankoubon", description: null };

    prismaMock.printFormat.update.mockResolvedValue(fakePrintFormat as any);

    const result = await printFormatMutations.updatePrintFormat(
      null,
      {
        id: "1",
        input: {
          name: "Tankoubon",
        },
      },
      {
        currentUser: fakeUserPayload,
      },
    );

    expect(result).toBe(fakePrintFormat);
    expect(prismaMock.printFormat.update).toHaveBeenCalledTimes(1);
  });

  it("update printFormat fail if missing currentUser", async () => {
    const fakePrintFormat = { id: 1, name: "Tankoubon", description: null };

    prismaMock.printFormat.update.mockResolvedValue(fakePrintFormat as any);

    try {
      await printFormatMutations.updatePrintFormat(
        null,
        { id: "1", input: { name: "Tankoubon" } },
        { currentUser: null },
      );
    } catch (error) {
      expect(error).toBeInstanceOf(AuthorizationError);
      const { message, extensions } = error as AuthorizationError;
      expect(message).toBe("Forbidden action");
      expect(extensions.code).toBe("FORBIDDEN");
      expect(extensions.http).toStrictEqual({ status: 403 });
    }
    expect(prismaMock.printFormat.update).not.toHaveBeenCalled();
  });

  it("update printFormat fail if prisma fail", async () => {
    prismaMock.printFormat.update.mockRejectedValue(null);

    try {
      await printFormatMutations.updatePrintFormat(
        null,
        {
          id: "1",
          input: {
            name: "Tankoubon",
          },
        },
        {
          currentUser: fakeUserPayload,
        },
      );
    } catch (error) {
      expect(error).toBeInstanceOf(GraphQLError);
      const { message, extensions } = error as GraphQLError;
      expect(message).toBe("Update PrintFormat Mutation failed");
      expect(extensions.code).toBe("INTERNAL_SERVER_ERROR");
    }
    expect(prismaMock.printFormat.update).toHaveBeenCalledTimes(1);
  });
});
