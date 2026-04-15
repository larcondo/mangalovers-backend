import { GraphQLScalarType, Kind } from "graphql";

const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  parseValue(value) {
    // Value received from the client as variables
    if (typeof value === "string" && !isNaN(new Date(value).getTime())) {
      return new Date(value);
    }
    throw new Error("DateTime scalar can only parse valid ISO 8601 strings");
  },
  serialize(value) {
    // Value sent to the client
    if (value instanceof Date) {
      return value.toISOString();
    }
    throw new Error("GraphQL Date Scalar serializer expected a `Date` object");
  },
  parseLiteral(ast) {
    // Handle date literals in queries
    if (ast.kind === Kind.STRING && !isNaN(new Date(ast.value).getTime())) {
      return new Date(ast.value);
    }
    return null;
  },
});

export default dateScalar;
