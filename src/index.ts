import "dotenv/config";
import { startApolloServer } from "./server";
import logger from "@services/logger";
import config from "@config/config";

const PORT = config.PORT;

try {
  const { url } = await startApolloServer(PORT);
  logger.log(`Mangalovers Server ready at ${url}`);
} catch (err) {
  console.log(err);
  process.exit(1);
}
