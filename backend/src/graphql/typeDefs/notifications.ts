import gql from "graphql-tag";

const typeDefs = gql`
  type Notification {
    id: String
    type: Type
    updatedAt: Date
    createdAt: Date
  }

  enum Type {
    FRIENDSHIP_CREATE
  }
`;
export default typeDefs;
