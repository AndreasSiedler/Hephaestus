import { gql } from "@apollo/client";

const typeDefs = gql`
  scalar Date

  # Object types
  type User {
    id: String
    username: String!
    name: String
    email: String
    image: String
  }

  type Conversation {
    id: String!
    messages: [Message]
    latestMessage: Message
    participants: [ConversationParticipant]
    createdAt: Date!
    updatedAt: Date!
  }

  type ConversationParticipant {
    id: String
    user: User
    conversation: Conversation
    hasSeenLatestMessage: Boolean
    createdAt: Date!
    updatedAt: Date!
  }

  type Message {
    id: String
    conversation: Conversation
    isLatestIn: Conversation
    body: String
    sender: User
    createdAt: Date!
    updatedAt: Date!
  }

  # Query and Mutation types
  type Query {
    conversations: [Conversation]
  }

  type Mutation {
    createConversation(participants: [String]): CreateConversationResponse
  }

  type CreateConversationResponse {
    conversationId: String
  }
`;

export default typeDefs;
