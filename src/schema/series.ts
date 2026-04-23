export const seriesTypeDefs = `#graphql
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

  type SeriesWithPagination {
    series: [Series]
    pagination: Pagination
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

  extend type Query {
    allSeries(page: Int): SeriesWithPagination
    seriesQty: Int!
    seriesById(id: ID!): Series!
    searchSeries(query: String!): [Series!]!
  }

  extend type Mutation {
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
  }
`;
