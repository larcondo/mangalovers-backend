import { ApolloServer } from "@apollo/server";
import { typeDefs } from "@schema/index";
import { resolvers } from "@resolvers/index";
import http from "http";
import app from "./app";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

// Below, we tell Apollo Server to "drain" this httpServer,
// enabling our servers to shut down gracefully.
const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

export { server, httpServer };
