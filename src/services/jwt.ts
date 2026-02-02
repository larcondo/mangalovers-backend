import "dotenv/config";
import jwt from "jsonwebtoken";
import type { StringValue } from "ms";
import { UserJWTPayload } from "src/types/user";

export class JWTService {
  private static secret = process.env.JWT_ACCESS_TOKEN_SECRET as string;
  private static expiresIn =
    (process.env.JWT_EXPIRES_IN as number | StringValue) ?? "15m";

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
