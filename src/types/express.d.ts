import "express";

declare global {
  namespace Express {
    export interface Request {
      user?: {
        id: string;
        username: string;
        email: string;
        role: number;
      };
    }
  }
}
