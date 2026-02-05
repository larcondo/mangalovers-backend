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

  type Query {
    allArtists: [Artist]
    artistQty: Int!
    allPrintFormats: [PrintFormat]
    printFormatQty: Int!
    allPublishers: [Publisher]
    publisherQty: Int!
    allSeries: [Series]
    seriesQty: Int!
    allVolumes: [Volume]
    volumeQty: Int!
  }

  type Mutation {
    createUser(
      username: String!
      password: String!
      email: String!
    ): UserCreated
    login(username: String!, password: String!): UserLoggedIn
    createArtist(name: String!): Artist
    createPublisher(name: String!): Publisher
    createPrintFormat(name: String!, description: String): PrintFormat
    createSeries(
      name: String!
      illustratorId: ID!
      writerId: ID!
      printFormatId: ID!
      publisherId: ID!
      urlCover: String
      isSingleVolume: Boolean
    ): Series
    createVolume(
      seriesId: ID!
      number: Int!
      title: String
      urlCover: String
      synopsis: String
      publicationDate: Date
    ): Volume
  }
`;
