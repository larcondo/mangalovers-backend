import authMutations from "./mutation/auth";

import artistQueries from "./query/artist";
import artistMutations from "./mutation/artist";

import publisherQueries from "./query/publisher";
import publisherMutations from "./mutation/publisher";

export const resolvers = {
  Query: {
    ...artistQueries,
    ...publisherQueries,
  },
  Mutation: {
    ...authMutations,
    ...artistMutations,
    ...publisherMutations,
  },
};
