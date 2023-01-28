import { gql } from "@apollo/client";

export default {
  Queries: {
    waitingFriendships: gql`
      query WaitingFriendships {
        waitingFriendships {
          id
          user {
            id
            username
            name
            image
          }
          status
          createdAt
        }
      }
    `,
  },
  Mutations: {
    requestFriendship: gql`
      mutation RequestFriendship($friendId: String!) {
        requestFriendship(friendId: $friendId) {
          success
          error
        }
      }
    `,
    acceptFriendship: gql`
      mutation AcceptFriendship($friendshipId: String!) {
        acceptFriendship(friendshipId: $friendshipId) {
          success
          error
        }
      }
    `,
  },
  Subscriptions: {},
};
