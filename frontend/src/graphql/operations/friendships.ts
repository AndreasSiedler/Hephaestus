import { gql } from "@apollo/client";

export default {
  Queries: {},
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
