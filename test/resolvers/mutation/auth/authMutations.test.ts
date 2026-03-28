import { prismaMock, mockAuthService } from "@test/jest.setup";
import authMutations from "@/resolvers/mutation/auth";
import { AuthService } from "@/services/auth";
import { GraphQLError } from "graphql";
import { AuthenticationError } from "@/helpers/auth";

// Mock config module
jest.mock("@config/config", () => ({
  PORT: 3000,
  DATABASE_URL: "",
  JWT_EXPIRES_IN: "30m",
  JWT_ACCESS_TOKEN_SECRET: "mysekretblablabla",
}));

const { mockComparePassword, mockHashPassword } = mockAuthService;

describe("auth mutations - create user", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("create user successfully", async () => {
    const fakeUser = {
      id: "1",
      username: "demouser",
      email: "demo@gmail.com",
      role: 0,
    };

    const spy1 = jest
      .spyOn(AuthService, "hashPassword")
      .mockImplementation(mockHashPassword);

    prismaMock.user.create.mockResolvedValue(fakeUser as any);

    const result = await authMutations.createUser(null, {
      username: "demouser",
      email: "demo@gmail.com",
      password: "sekret1",
    });

    expect(result).toBe(fakeUser);
    expect(prismaMock.user.create).toHaveBeenCalledTimes(1);
    expect(spy1).toHaveBeenCalledTimes(1);
  });

  it("create user fail if prisma fail", async () => {
    const spy1 = jest
      .spyOn(AuthService, "hashPassword")
      .mockImplementation(mockHashPassword);

    prismaMock.user.create.mockRejectedValue(null);

    try {
      await authMutations.createUser(null, {
        username: "demouser",
        email: "demo@gmail.com",
        password: "sekret1",
      });
    } catch (error) {
      expect(error).toBeInstanceOf(GraphQLError);
      const { message, extensions } = error as GraphQLError;
      expect(message).toBe("Create User failed");
      expect(extensions.code).toBe("INTERNAL_SERVER_ERROR");
    }

    expect(prismaMock.user.create).toHaveBeenCalledTimes(1);
    expect(spy1).toHaveBeenCalled();
  });

  it("create user fail if hashPassword fail", async () => {
    const fakeUser = {
      id: "1",
      username: "demouser",
      email: "demo@gmail.com",
      role: 0,
    };

    const spy1 = jest
      .spyOn(AuthService, "hashPassword")
      .mockRejectedValue(null);

    prismaMock.user.create.mockResolvedValue(fakeUser as any);

    try {
      await authMutations.createUser(null, {
        username: "demouser",
        email: "demo@gmail.com",
        password: "sekret1",
      });
    } catch (error) {
      expect(error).toBeInstanceOf(GraphQLError);
      const { message, extensions } = error as GraphQLError;
      expect(message).toBe("Create User failed");
      expect(extensions.code).toBe("INTERNAL_SERVER_ERROR");
    }

    expect(prismaMock.user.create).not.toHaveBeenCalled();
    expect(spy1).toHaveBeenCalled();
  });
});

describe("auth mutations - login user", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("login user successfully", async () => {
    const fakeUser = {
      id: "1",
      username: "demouser",
      password: "hashedsekret1",
      email: "demo@gmail.com",
      role: 0,
    };

    const spy1 = jest
      .spyOn(AuthService, "comparePassword")
      .mockImplementation(mockComparePassword);

    prismaMock.user.findUnique.mockResolvedValue(fakeUser as any);

    const result = await authMutations.login(null, {
      username: "demouser",
      password: "sekret1",
    });

    expect(result).toBeDefined();
    if (result) {
      expect(result.username).toBe("demouser");
      expect(result.email).toBe("demo@gmail.com");
      expect(result.isAdmin).toBe(false);
      expect(result.accessToken).toBeDefined();
      expect(result.accessToken.length).toBeGreaterThan(1);
      expect(typeof result.accessToken).toBe("string");
    }
    expect(prismaMock.user.findUnique).toHaveBeenCalledTimes(1);
    expect(spy1).toHaveBeenCalledTimes(1);
  });

  it("login user fail if user doesn't exist", async () => {
    const spy1 = jest
      .spyOn(AuthService, "comparePassword")
      .mockImplementation(mockComparePassword);

    prismaMock.user.findUnique.mockResolvedValue(null);

    try {
      await authMutations.login(null, {
        username: "demouser",
        password: "sekret1",
      });
    } catch (error) {
      expect(error).toBeInstanceOf(AuthenticationError);
      const { message, extensions } = error as AuthenticationError;
      expect(message).toBe("User demouser doesn't exists.");
      expect(extensions.code).toBe("UNAUTHENTICATED");
      expect(extensions.field).toBe("username");
      expect(extensions.http).toStrictEqual({ status: 401 });
    }
    expect(prismaMock.user.findUnique).toHaveBeenCalledTimes(1);
    expect(spy1).not.toHaveBeenCalled();
  });

  it("login user fail if wrong password", async () => {
    const fakeUser = {
      id: "1",
      username: "demouser",
      password: "hashedsekret1",
      email: "demo@gmail.com",
      role: 0,
    };

    const spy1 = jest
      .spyOn(AuthService, "comparePassword")
      .mockImplementation(mockComparePassword);

    prismaMock.user.findUnique.mockResolvedValue(fakeUser as any);

    try {
      await authMutations.login(null, {
        username: "demouser",
        password: "secreto",
      });
    } catch (error) {
      expect(error).toBeInstanceOf(AuthenticationError);
      const { message, extensions } = error as AuthenticationError;
      expect(message).toBe("Wrong password. Try again.");
      expect(extensions.code).toBe("UNAUTHENTICATED");
      expect(extensions.field).toBe("password");
      expect(extensions.http).toStrictEqual({ status: 401 });
    }

    expect(prismaMock.user.findUnique).toHaveBeenCalledTimes(1);
    expect(spy1).toHaveBeenCalledTimes(1);
  });

  it("login user fail if prisma fail", async () => {
    prismaMock.user.findUnique.mockRejectedValue(null);

    try {
      await authMutations.login(null, {
        username: "demouser",
        password: "sekret1",
      });
    } catch (error) {
      expect(error).toBeInstanceOf(GraphQLError);
      const { message, extensions } = error as GraphQLError;
      expect(message).toBe("Login failed");
      expect(extensions.code).toBe("INTERNAL_SERVER_ERROR");
    }
    expect(prismaMock.user.findUnique).toHaveBeenCalledTimes(1);
  });
});
