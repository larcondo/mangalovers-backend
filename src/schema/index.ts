import { authTypeDefs } from "./auth";
import { artistTypeDefs } from "./artist";
import { printFormatTypeDefs } from "./printFormat";
import { publisherTypeDefs } from "./publisher";
import { seriesTypeDefs } from "./series";
import { volumeTypeDefs } from "./volume";
import { userTypeDefs } from "./user";

export const baseTypeDefs = `#graphql
  scalar Date

  type Pagination {
    page: Int!
    totalPages: Int!
    totalEntries: Int
    offset: Int!
    hasNextPage: Boolean!
    nextPage: Int
  }

  type Query {
    version: String
  }

  type Mutation {
    version: String
  }
`;

export const typeDefs = [
  baseTypeDefs,
  authTypeDefs,
  artistTypeDefs,
  printFormatTypeDefs,
  publisherTypeDefs,
  seriesTypeDefs,
  volumeTypeDefs,
  userTypeDefs,
];
