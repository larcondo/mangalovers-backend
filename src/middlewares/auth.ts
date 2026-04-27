import { JWTService } from "@/services/jwt";
import { Request, Response, NextFunction } from "express";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const auth = req.headers.authorization;
  const prefix = "Bearer ";

  if (!auth || !auth.startsWith(prefix)) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = auth.substring(prefix.length);

  try {
    const user = JWTService.verifyAccessToken(token);
    req.user = user;

    next();
  } catch (error) {
    return res.status(403).json({ message: "Forbidden: invalid token" });
  }
};

export default authMiddleware;
