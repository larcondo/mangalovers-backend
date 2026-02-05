export enum Roles {
  Unknown = 0,
  Basic = 1,
  Editor = 2,
  Admin = 10,
}

// AccessToken Generation
export interface UserJWTPayload {
  username: string;
  email: string;
  role: number;
}

// GraphQL Mutations
export interface LoginArgs {
  username: string;
  password: string;
}

export interface CreateUserArgs {
  username: string;
  password: string;
  email: string;
}

export interface Authorization {
  currentUser: UserJWTPayload | null;
}
