import { Prisma } from "@prisma/client";
import { GraphQLError } from "graphql";
import { GraphQLContext } from "../../util/types";

const resolvers = {
  Query: {
    waitingFriendships: async (_: any, __: any, context: GraphQLContext) => {
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
    acceptFriendship: async (_: any, args: { friendshipId: string }, context: GraphQLContext) => {
      const { friendshipId } = args;
      const { prisma, session } = context;

      if (!session?.user) {
        return new GraphQLError("Not authorized");
      }

      const {
        user: { id: myUserId },
      } = session;

      try {
        /**
         * Get friendship with user and friend
         */
        const friendship = await prisma.friendship.findUnique({
          where: {
            id: friendshipId,
          },
          include: {
            user: {
              select: {
                username: true,
                accounts: {
                  select: {
                    access_token: true,
                    scope: true,
                  },
                },
              },
            },
            friend: {
              select: {
                username: true,
                accounts: {
                  select: {
                    access_token: true,
                    scope: true,
                  },
                },
              },
            },
          },
        });
        console.log(friendship);

        /**
         * Update Friendship status
         */
        if (friendship?.friendId !== myUserId) {
          return {
            success: false,
            error: "You are not allowed to accept this friendship",
          };
        }

        await prisma.friendship.update({
          where: {
            id: friendshipId,
          },
          data: {
            status: false,
          },
        });

        return {
          success: true,
        };

        /**
         * Make github follow request for both users
         */

        // const res = await fetch(
        //   `https://api.github.com/user/following/${friendship?.user.username}`
        // );
      } catch (error: any) {
        console.log("acceptFriendship error", error);
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
