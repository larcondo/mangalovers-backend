import "dotenv/config";
import jwt from "jsonwebtoken";
import { UserJWTPayload } from "@types-app/user";
import config from "@config/config";

export class JWTService {
  private static secret = config.JWT_ACCESS_TOKEN_SECRET;
  private static expiresIn = config.JWT_EXPIRES_IN ?? "15m";

  // Genera un nuevo accessToken
  static createAccessToken = (payload: UserJWTPayload): string => {
    return jwt.sign(payload, this.secret, {
      expiresIn: this.expiresIn,
    });
  };

  // Verifica si el token es válido
  static verifyAccessToken = (token: string): UserJWTPayload => {
    try {
      return jwt.verify(token, this.secret) as UserJWTPayload;
    } catch (err) {
      throw new Error("Token inválido o expirado.");
    }
  };
}
