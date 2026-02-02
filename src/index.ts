import "dotenv/config";
import { server } from "./server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { JWTService } from "./services/jwt";

if (!process.env.PORT) {
  console.error("Error: Environment Variable PORT is not defined!");
  process.exit(1);
}

const PORT = Number(process.env.PORT);

startStandaloneServer(server, {
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    const currentUser =
      auth && auth.startsWith("Bearer ")
        ? JWTService.verifyAccessToken(auth.substring(7))
        : null;
    return { currentUser };
  },
  listen: {
    port: PORT,
  },
}).then(({ url }) => {
  console.log(`Mangalovers Server ready at ${url}`);
});
