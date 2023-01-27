import { gql } from "@apollo/client";

export default {
  Queries: {
    getUser: gql`
      query GetUser {
        getUser {
          id
          username
          name
          image
        }
      }
    `,
    searchUsers: gql`
      query SearchUsers($username: String!) {
        searchUsers(username: $username) {
          id
          username
        }
      }
    `,
  },
  Mutations: {
    createUsername: gql`
      mutation CreateUsername($username: String!) {
        createUsername(username: $username) {
          success
          error
        }
      }
    `,
  },
  Subscriptions: {},
};
