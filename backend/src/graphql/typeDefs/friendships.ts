import gql from "graphql-tag";

const typeDefs = gql`
  type Mutation {
    requestFriendship(friendId: String): RequestFriendshipResponse
  }

  type RequestFriendshipResponse {
    success: Boolean
    error: String
  }
`;

export default typeDefs;
