import { PrismaClient } from "generated/prisma/client";
import { mockDeep, DeepMockProxy, mockReset } from "jest-mock-extended";

import { prisma } from "@/prisma";

jest.mock("@/prisma", () => ({
  __esModule: true,
  prisma: mockDeep<PrismaClient>(),
}));

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;

beforeEach(() => {
  mockReset(prismaMock);
});

export const fakeUserPayload = {
  id: "1",
  username: "demouser",
  email: "demo@gmail.com",
  role: 10,
};

// Simulate hashPassword method
const mockHashPassword = (password: string): Promise<string> => {
  return Promise.resolve(`hashed${password}`);
};

// Simulate comparePassword method
const mockComparePassword = (
  password: string,
  hash: string,
): Promise<boolean> => {
  return Promise.resolve(password === hash.substring("hashed".length));
};

// Simulate AuthService class
export const mockAuthService = {
  mockComparePassword,
  mockHashPassword,
};
