export const publisherTypeDefs = `#graphql
  type Publisher {
    id: ID!
    name: String!
  }

  type PublishersWithPagination {
    publishers: [Publisher]
    pagination: Pagination
  }

  input UpdatePublisherInput {
    name: String
  }

  extend type Query {
    allPublishers(page: Int): PublishersWithPagination
    publisherQty: Int!
    searchPublishers(query: String!): [Publisher!]!
  }

  extend type Mutation {
    createPublisher(name: String!): Publisher
    updatePublisher(id: ID!, input: UpdatePublisherInput!): Publisher!
  }
`;
