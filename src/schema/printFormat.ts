export const printFormatTypeDefs = `#graphql
  type PrintFormat {
    id: ID!
    name: String!
    description: String
  }

  type PrintFormatsWithPagination {
    printFormats: [PrintFormat]
    pagination: Pagination
  }

  input UpdatePrintFormatInput {
    name: String
    description: String
  }

  extend type Query {
    allPrintFormats(page: Int): PrintFormatsWithPagination
    printFormatQty: Int!
    searchPrintFormats(query: String!): [PrintFormat!]!
  }

  extend type Mutation {
    createPrintFormat(name: String!, description: String): PrintFormat
    updatePrintFormat(id: ID!, input: UpdatePrintFormatInput!): PrintFormat!
  }
`;
