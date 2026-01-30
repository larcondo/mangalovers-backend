import "dotenv/config";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";

if (!process.env.PORT) {
  console.error("Error: Environment Variable PORT is not defined!");
  process.exit(1);
}

const PORT = Number(process.env.PORT);

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: {
    port: PORT,
  },
}).then(({ url }) => {
  console.log(`Mangalovers Server ready at ${url}`);
});
