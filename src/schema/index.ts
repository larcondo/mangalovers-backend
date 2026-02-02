export const typeDefs = `
  type User {
    id: ID!
    username: String!
    password: String!
    email: String!
  }

  type UserCreated {
    username: String!
    email: String!
  }
    
  type UserLoggedIn {
    username: String!
    email: String!
    accessToken: String!
  }

  type Artist {
    id: ID!
    name: String!
  }

  type Publisher {
    id: ID!
    name: String!
  }

  type Query {
    allUsers: [User]
    allArtists: [Artist]
    artistQty: Int!
    allPublishers: [Publisher]
    publisherQty: Int!
  }

  type Mutation {
    createUser(
      username: String!
      password: String!
      email: String!
    ): UserCreated
    login(
      username: String!
      password: String!
    ): UserLoggedIn
    createArtist(name: String!): Artist
    createPublisher(name: String!): Publisher
  }
`;
