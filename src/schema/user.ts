export const userTypeDefs = `#graphql
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

  extend type Query {
    userSeries: [UserSeries]
  }

  extend type Mutation {
    setUserSeries(seriesId: ID!): UserSeriesStatus!
    unsetUserSeries(seriesId: ID!): UserSeriesStatus!
  }
`;
