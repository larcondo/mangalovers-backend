import "dotenv/config";
import { server } from "./server";
import { startStandaloneServer } from "@apollo/server/standalone";

if (!process.env.PORT) {
  console.error("Error: Environment Variable PORT is not defined!");
  process.exit(1);
}

const PORT = Number(process.env.PORT);

startStandaloneServer(server, {
  listen: {
    port: PORT,
  },
}).then(({ url }) => {
  console.log(`Mangalovers Server ready at ${url}`);
});
