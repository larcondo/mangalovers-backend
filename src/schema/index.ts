export const gql = String.raw;

export const typeDefs = gql`
  scalar Date

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

  type Artist {
    id: ID!
    name: String!
  }

  type PrintFormat {
    id: ID!
    name: String!
    description: String
  }

  type Publisher {
    id: ID!
    name: String!
  }

  type Author {
    writer: Artist!
    illustrator: Artist!
  }

  type Series {
    id: ID!
    name: String!
    author: Author!
    publisher: Publisher!
    printFormat: PrintFormat!
    urlCover: String
    isSingleVolume: Boolean
  }

  type Volume {
    id: ID!
    series: Series!
    number: Int!
    title: String
    synopsis: String
    urlCover: String
    publicationDate: Date
  }

  type UserSeries {
    id: ID
    series: Series
  }

  type UserSeriesStatus {
    id: ID!
    active: Boolean!
    activatedAt: Date!
    deactivatedAt: Date
  }

  type Pagination {
    page: Int!
    totalPages: Int!
    totalEntries: Int
    offset: Int!
    hasNextPage: Boolean!
    nextPage: Int
  }

  type ArtistsWithPagination {
    artists: [Artist]
    pagination: Pagination
  }

  type PrintFormatsWithPagination {
    printFormats: [PrintFormat]
    pagination: Pagination
  }

  type PublishersWithPagination {
    publishers: [Publisher]
    pagination: Pagination
  }

  type SeriesWithPagination {
    series: [Series]
    pagination: Pagination
  }

  type VolumesWithPagination {
    volumes: [Volume]
    pagination: Pagination
  }

  input UpdateArtistInput {
    name: String
  }

  input UpdatePrintFormatInput {
    name: String
    description: String
  }

  input UpdatePublisherInput {
    name: String
  }

  input UpdateSeriesInput {
    name: String
    publisherId: ID
    printFormatId: ID
    illustratorId: ID
    writerId: ID
    urlCover: String
    isSingleVolume: String
  }

  input UpdateVolumeInput {
    number: Int
    title: String
    urlCover: String
    synopsis: String
    publicationDate: Date
    seriesId: ID
  }

  type Query {
    allArtists: ArtistsWithPagination
    artistQty: Int!
    searchArtists(query: String!): [Artist!]!
    allPrintFormats: PrintFormatsWithPagination
    printFormatQty: Int!
    searchPrintFormats(query: String!): [PrintFormat!]!
    allPublishers: PublishersWithPagination
    publisherQty: Int!
    searchPublishers(query: String!): [Publisher!]!
    allSeries(page: Int): SeriesWithPagination
    seriesQty: Int!
    seriesById(id: ID!): Series!
    searchSeries(query: String!): [Series!]!
    allVolumes(page: Int): VolumesWithPagination
    volumeQty: Int!
    volumeById(id: ID!): Volume!
    volumesBySeries(seriesId: ID!): [Volume!]!
    userSeries: [UserSeries]
  }

  type Mutation {
    createUser(
      username: String!
      password: String!
      email: String!
    ): UserCreated
    login(username: String!, password: String!): UserLoggedIn
    createArtist(name: String!): Artist
    updateArtist(id: ID!, input: UpdateArtistInput): Artist!
    createPublisher(name: String!): Publisher
    updatePublisher(id: ID!, input: UpdatePublisherInput!): Publisher!
    createPrintFormat(name: String!, description: String): PrintFormat
    updatePrintFormat(id: ID!, input: UpdatePrintFormatInput!): PrintFormat!
    createSeries(
      name: String!
      illustratorId: ID!
      writerId: ID!
      printFormatId: ID!
      publisherId: ID!
      urlCover: String
      isSingleVolume: Boolean
    ): Series
    updateSeries(id: ID!, input: UpdateSeriesInput!): Series!
    createVolume(
      seriesId: ID!
      number: Int!
      title: String
      urlCover: String
      synopsis: String
      publicationDate: Date
    ): Volume
    updateVolume(id: ID!, input: UpdateVolumeInput!): Volume!
    setUserSeries(seriesId: ID!): UserSeriesStatus!
    unsetUserSeries(seriesId: ID!): UserSeriesStatus!
  }
`;
