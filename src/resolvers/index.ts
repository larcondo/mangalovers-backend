import { UserDefault } from "src/types/user";

import artistQueries from "./query/artist";
import artistMutations from "./mutation/artist";

import publisherQueries from "./query/publisher";
import publisherMutations from "./mutation/publisher";

const users: UserDefault[] = [];

export const resolvers = {
  Query: {
    allUsers: () => users,
    ...artistQueries,
    ...publisherQueries,
  },
  Mutation: {
    ...artistMutations,
    ...publisherMutations,
  },
};
