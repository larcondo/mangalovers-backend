export const volumeTypeDefs = `#graphql
  type Volume {
    id: ID!
    series: Series!
    number: Int!
    title: String
    synopsis: String
    urlCover: String
    publicationDate: Date
  }

  type VolumesWithPagination {
    volumes: [Volume]
    pagination: Pagination
  }

  input UpdateVolumeInput {
    number: Int
    title: String
    urlCover: String
    synopsis: String
    publicationDate: Date
    seriesId: ID
  }

  extend type Query {
    allVolumes(page: Int): VolumesWithPagination
    volumeQty: Int!
    volumeById(id: ID!): Volume!
    volumesBySeries(seriesId: ID!): [Volume!]!
  }

  extend type Mutation {
    createVolume(
      seriesId: ID!
      number: Int!
      title: String
      urlCover: String
      synopsis: String
      publicationDate: Date
    ): Volume
    updateVolume(id: ID!, input: UpdateVolumeInput!): Volume!
  }
`;
