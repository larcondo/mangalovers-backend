import { ExpressContextFunctionArgument } from "@as-integrations/express5";
import { JWTService } from "./services/jwt";

// Apollo Server context function definition
const apolloContext = async ({ req }: ExpressContextFunctionArgument) => {
  const auth = req ? req.headers.authorization : null;
  const currentUser =
    auth && auth.startsWith("Bearer ")
      ? JWTService.verifyAccessToken(auth.substring(7))
      : null;
  return { currentUser };
};

export { apolloContext };
