import { Prisma } from "@prisma/client";
import { GraphQLError } from "graphql";
import { GraphQLContext } from "../../util/types";

const resolvers = {
  Query: {
    getWaitingFriendships: async (_: any, args: { friendId: string }, context: GraphQLContext) => {
      console.log("Hello from the server");
      const { prisma, session } = context;

      if (!session?.user) {
        throw new GraphQLError("Not authorized");
      }

      const {
        user: { id: myUserId },
      } = session;

      try {
        const waitingFriendships = await prisma.friendship.findMany({
          where: {
            friendId: myUserId,
            status: false,
          },
          include: friendPopulated,
        });

        return waitingFriendships;
      } catch (error: any) {
        console.log("getWaitingFriendships error", error);
        throw new GraphQLError(error.message);
      }
    },
  },
  Mutation: {
    requestFriendship: async (_: any, args: { friendId: string }, context: GraphQLContext) => {
      const { prisma, session } = context;
      const { friendId } = args;

      if (!session?.user) {
        throw new GraphQLError("Not authorized");
      }

      const {
        user: { id: myUserId },
      } = session;

      try {
        /**
         * Check if friendship or friendship request already exists
         */
        const existingFriendship = await prisma.friendship.findFirst({
          where: {
            OR: [
              {
                userId: myUserId,
                friendId: friendId,
              },
              {
                userId: friendId,
                friendId: myUserId,
              },
            ],
          },
        });
        if (existingFriendship) {
          return {
            success: false,
            error: existingFriendship.status
              ? "Friendship already exists"
              : "Friendship already requested",
          };
        }

        /**
         * Create frienship with status false
         */
        await prisma.friendship.create({
          data: {
            userId: myUserId,
            friendId: friendId,
          },
        });

        return {
          success: true,
        };
      } catch (error: any) {
        console.log("requestFriendship error", error);
        throw new GraphQLError(error.message);
      }
    },
  },
};

export const friendPopulated = Prisma.validator<Prisma.FriendshipInclude>()({
  user: {
    select: {
      id: true,
      username: true,
      name: true,
      image: true,
    },
  },
});

export default resolvers;
