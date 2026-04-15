import { ApolloServer } from "@apollo/server";
import { typeDefs } from "@schema/index";
import { resolvers } from "@resolvers/index";

export const server = new ApolloServer({
  typeDefs,
  resolvers,
});
