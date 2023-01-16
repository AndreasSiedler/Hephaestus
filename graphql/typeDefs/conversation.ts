import { gql } from "@apollo/client";

const typeDefs = gql`
  type Mutation {
    createConversation(participants: [String]): CreateConversationResponse
  }

  type CreateConversationResponse {
    conversationId: String
  }
`;

export default typeDefs;
