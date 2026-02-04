import { Author } from "@types-app/series";

// Scalar resolver
import dateScalar from "./DateScalar";

import authMutations from "./mutation/auth";

import artistQueries from "./query/artist";
import artistMutations from "./mutation/artist";

import publisherQueries from "./query/publisher";
import publisherMutations from "./mutation/publisher";

import printFormatQueries from "./query/printFormat";
import printFormatMutations from "./mutation/printFormat";

import seriesQueries from "./query/series";
import seriesMutation from "./mutation/series";

export const resolvers = {
  Query: {
    ...artistQueries,
    ...publisherQueries,
    ...printFormatQueries,
    ...seriesQueries,
  },
  Date: dateScalar,
  Series: {
    author: (root: Author) => {
      return {
        writer: root.writer,
        illustrator: root.illustrator,
      };
    },
  },
  Mutation: {
    ...authMutations,
    ...artistMutations,
    ...publisherMutations,
    ...printFormatMutations,
    ...seriesMutation,
  },
};
