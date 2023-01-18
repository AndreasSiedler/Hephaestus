import { gql } from "@apollo/client";

export default {
  Queries: {
    conversations: gql`
      query Conversation {
        conversations {
          id
          latestMessage {
            id
            body
          }
          participants {
            id
            hasSeenLatestMessage
            user {
              username
              name
              image
            }
          }
        }
      }
    `,
  },
  Mutations: {
    createConversation: gql`
      mutation CreateConversation($participants: [String]!) {
        createConversation(participants: $participants) {
          conversationId
        }
      }
    `,
  },
  Subscriptions: {},
};
