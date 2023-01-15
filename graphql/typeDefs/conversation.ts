import { gql } from "@apollo/client";

const typeDefs = gql`
  type Mutation {
    createConversation(participants: [String]): CreateConversationResponse
  }

  type CreateConversationResponse {
    success: Boolean
    error: String
  }
`;

export default typeDefs;
