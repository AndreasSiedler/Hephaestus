import { gql } from "@apollo/client";

export const NotificationFields = `
  id
  isRead
  sender {
    name
    username
    image
  }
  type
  createdAt
`;

export default {
  Query: {
    notifications: gql`
      query Notifications {
        notifications {
          ${NotificationFields}
        }
      }
    `,
  },
  Subscriptions: {
    notificationCreated: gql`
      subscription NotificationCreated {
        notificationCreated {
         ${NotificationFields}
        }
      }
    `,
  },
};
