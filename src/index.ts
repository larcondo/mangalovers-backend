import "dotenv/config";
import { server } from "./server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { JWTService } from "@services/jwt";
import config from "@config/config";

const PORT = config.PORT;

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
