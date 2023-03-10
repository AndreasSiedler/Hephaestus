import gql from "graphql-tag";

const typeDefs = gql`
  type Notification {
    id: String
    isRead: Boolean
    type: Type
    sender: User
    updatedAt: Date
    createdAt: Date
  }

  enum Type {
    FRIENDSHIP_CREATE
  }

  type Query {
    notifications: [Notification]
  }

  type Subscription {
    notificationCreated: Notification
  }
`;
export default typeDefs;
