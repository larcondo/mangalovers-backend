import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "@schema/index";
import { resolvers } from "@resolvers/index";
import { JWTService } from "@services/jwt";

export const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export async function startApolloServer(port: number = 4000) {
  const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null;
      const currentUser =
        auth && auth.startsWith("Bearer ")
          ? JWTService.verifyAccessToken(auth.substring(7))
          : null;
      return { currentUser };
    },
    listen: {
      port,
    },
  });
  return { url, server };
}
