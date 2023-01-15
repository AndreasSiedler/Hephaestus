import { gql } from "@apollo/client";

export default {
  Queries: {},
  Mutations: {
    createConversation: gql`
      mutation CreateConversation($participants: [String]!) {
        createConversation(participants: $participants) {
          success
          error
        }
      }
    `,
  },
  Subscriptions: {},
};
