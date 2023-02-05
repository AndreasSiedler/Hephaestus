import { GraphQLError } from "graphql";
import { withFilter } from "graphql-subscriptions";
import { GraphQLContext, NotificationCreatedSubscriptionPayload } from "../../util/types";

const resolvers = {
  Query: {
    notifications: async (_: any, __: any, context: GraphQLContext) => {
      const { session, prisma } = context;

      if (!session?.user) {
        throw new GraphQLError("Not authorized");
      }

      const {
        user: { id: userId },
      } = session;

      /**
       * Get last 10 notifications
       */
      try {
        const notifications = await prisma.notification.findMany({
          where: {
            userId: userId,
          },
          include: {
            sender: {
              select: {
                name: true,
                username: true,
                image: true,
              },
            },
          },
          take: 10,
        });

        return notifications;
      } catch (error: any) {
        console.log("messages error", error);
        throw new GraphQLError(error?.message);
      }
    },
  },
  Subscription: {
    notificationCreated: {
      subscribe: withFilter(
        (_: any, __: any, context: GraphQLContext) => {
          const { pubsub } = context;
          return pubsub.asyncIterator(["NOTIFICATION_CREATED"]);
        },
        (payload: NotificationCreatedSubscriptionPayload, _, context: GraphQLContext) => {
          const { session } = context;

          if (!session?.user) {
            throw new GraphQLError("Not authorized");
          }

          const { id: myUserId } = session.user;
          const { userId } = payload.notificationCreated;

          return myUserId === userId;
        }
      ),
    },
  },
};

export default resolvers;
