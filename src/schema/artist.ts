export const artistTypeDefs = `#graphql
  type Artist {
    id: ID!
    name: String!
  }

  type ArtistsWithPagination {
    artists: [Artist]
    pagination: Pagination
  }

  input UpdateArtistInput {
    name: String
  }

  extend type Query {
    allArtists(page: Int): ArtistsWithPagination
    artistQty: Int!
    searchArtists(query: String!): [Artist!]!
  }

  extend type Mutation {
    createArtist(name: String!): Artist
    updateArtist(id: ID!, input: UpdateArtistInput): Artist!
  }
`;
