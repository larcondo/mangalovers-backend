import { Authorization, Roles } from "@types-app/user";
import bcrypt from "bcrypt";

export class AuthService {
  static hashPassword = async (password: string): Promise<string> => {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  };

  static comparePassword = async (
    password: string,
    hash: string,
  ): Promise<boolean> => {
    return bcrypt.compare(password, hash);
  };

  static isUserAuthorized = (context: Authorization) => {
    return context.currentUser && context.currentUser.role === Roles.Admin;
  };
}
