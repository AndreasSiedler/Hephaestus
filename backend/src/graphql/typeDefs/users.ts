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
    updateUser(
      name: String
      email: String
      bio: String
      location: String
      blog: String
      status: String
      syncGithub: Boolean
    ): UpdateUserResponse
    createUsername(username: String!): CreateUsernameResponse
  }

  type UpdateUserInput {
    name: String
    email: String
    bio: String
    location: String
    blog: String
    status: String
    syncGithub: Boolean
  }

  type UpdateUserResponse {
    success: Boolean
    error: String
  }

  type CreateUsernameResponse {
    success: Boolean
    error: String
  }
`;

export default typeDefs;
