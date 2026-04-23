export const authTypeDefs = `#graphql
  type UserCreated {
    username: String!
    email: String!
  }

  type UserLoggedIn {
    username: String!
    email: String!
    accessToken: String!
    isAdmin: Boolean
  }

  extend type Mutation {
    createUser(
      username: String!
      password: String!
      email: String!
    ): UserCreated
    login(username: String!, password: String!): UserLoggedIn
  }
`;
