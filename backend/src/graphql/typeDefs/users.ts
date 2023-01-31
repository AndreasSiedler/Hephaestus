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

  input Skill {
    name: String
    weight: Int
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
      skills: [Skill]
    ): UpdateUserResponse
    createUsername(username: String!): CreateUsernameResponse
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
