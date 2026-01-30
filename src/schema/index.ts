export const typeDefs = `
  type User {
    id: ID!
    username: String!
    password: String!
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
    createArtist(name: String!): Artist
    createPublisher(name: String!): Publisher
  }
`;
