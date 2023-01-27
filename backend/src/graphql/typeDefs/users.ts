import gql from "graphql-tag";

const typeDefs = gql`
  scalar Date

  type User {
    id: String
    username: String
    name: String
    image: String
  }

  type Query {
    getUser: User
    searchUsers(username: String!): [User]
  }

  type Mutation {
    createUsername(username: String!): CreateUsernameResponse
  }

  type CreateUsernameResponse {
    success: Boolean
    error: String
  }
`;

export default typeDefs;
