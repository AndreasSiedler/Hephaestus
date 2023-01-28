import gql from "graphql-tag";

const typeDefs = gql`
  type Friendship {
    id: String
    user: User
    status: Boolean
    createdAt: Date
  }

  type Query {
    waitingFriendships: [Friendship]
  }

  type Mutation {
    requestFriendship(friendId: String): RequestFriendshipResponse
    acceptFriendship(friendshipId: String): AcceptFriendshipResponse
  }

  type RequestFriendshipResponse {
    success: Boolean
    error: String
  }

  type AcceptFriendshipResponse {
    success: Boolean
    error: String
  }
`;

export default typeDefs;
