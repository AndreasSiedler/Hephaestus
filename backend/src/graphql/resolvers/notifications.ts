import { GraphQLError } from "graphql";
import { GraphQLContext } from "../../util/types";

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
          take: 10,
        });

        return notifications;
      } catch (error: any) {
        console.log("messages error", error);
        throw new GraphQLError(error?.message);
      }
    },
  },
};

export default resolvers;
