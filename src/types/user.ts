// AccessToken Generation
export interface UserJWTPayload {
  username: string;
  email: string;
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
