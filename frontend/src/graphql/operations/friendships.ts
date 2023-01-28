import { gql } from "@apollo/client";

export default {
  Queries: {
    friendships: gql`
      query Friendships {
        friendships {
          id
          user {
            id
            username
            name
            image
          }
          friend {
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
    cancelFriendship: gql`
      mutation CancelFriendship($friendshipId: String!) {
        cancelFriendship(friendshipId: $friendshipId) {
          success
          error
        }
      }
    `,
  },
  Subscriptions: {},
};
