import { gql } from "@apollo/client";

export default {
  Queries: {
    getFriendships: gql`
      query GetWaitingFriendships {
        getWaitingFriendships {
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
      mutation RequestFriendship($friendId: String) {
        requestFriendship(friendId: $friendId) {
          success
          error
        }
      }
    `,
  },
  Subscriptions: {},
};
