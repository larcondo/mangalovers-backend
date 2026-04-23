import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "generated/prisma/client";
import config from "@config/config";

const connectionString =
  process.env.NODE_ENV === "test"
    ? config.TEST_DATABASE_URL
    : config.DATABASE_URL;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export { prisma };
