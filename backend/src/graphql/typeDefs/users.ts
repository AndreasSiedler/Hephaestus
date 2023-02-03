import gql from "graphql-tag";

const typeDefs = gql`
  scalar Date

  type User {
    id: String
    name: String
    username: String
    email: String
    location: String
    bio: String
    image: String
    expertise: String
    skills: [Skill]
  }

  type Query {
    populatedUser: User
    getUser: User
    searchUsers(username: String!): [User]
  }

  input SkillInput {
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
      skills: [SkillInput]
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
