import "dotenv/config";
import logger from "@services/logger";
import config from "@config/config";
import { server, httpServer } from "./server";
import app from "./app";
import { expressMiddleware } from "@as-integrations/express5";
import { apolloContext } from "./context";
import { initUploads } from "./services/uploads";

const PORT = config.PORT;

await initUploads();

// We must call and await server.start() before using the integration.
await server.start();

// Set up our Express middleware to handle graphql requests
app.use(
  "/graphql",
  expressMiddleware(server, {
    context: apolloContext,
  }),
);

httpServer.listen(PORT, () => {
  logger.log(`Mangalovers Server running on port: ${PORT}`);
  logger.log(`Sandbox Apollo Server on: http://localhost:${PORT}/graphql`);
  logger.log(`Started at: ${new Date()}`);
});
