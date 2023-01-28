import { Prisma } from "@prisma/client";
import axios from "axios";
import { GraphQLError } from "graphql";
import { GraphQLContext } from "../../util/types";

const resolvers = {
  Query: {
    friendships: async (_: any, __: any, context: GraphQLContext) => {
      const { prisma, session } = context;

      if (!session?.user) {
        throw new GraphQLError("Not authorized");
      }

      const {
        user: { id: myUserId },
      } = session;

      try {
        const friendships = await prisma.friendship.findMany({
          where: {
            OR: [
              {
                friendId: myUserId,
                status: true,
              },
              {
                userId: myUserId,
                status: true,
              },
            ],
          },
          include: {
            friend: {
              select: {
                id: true,
                username: true,
                name: true,
                image: true,
              },
            },
            user: {
              select: {
                id: true,
                username: true,
                name: true,
                image: true,
              },
            },
          },
        });

        return friendships;
      } catch (error: any) {
        console.log("friendships error", error);
        throw new GraphQLError(error.message);
      }
    },
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
        console.log("waitingFriendships error", error);
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
         * Poulate with account 'github' access token to execute the following requests later
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

        /**
         * Update Friendship status
         * Check first if this friendship is addressed to you
         * Then update the friendship with new status
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
            status: true,
          },
        });

        /**
         * Make github follow request for both users
         */
        const {
          user: { username, accounts },
          friend: { username: myUsername, accounts: myAccounts },
        } = friendship;

        //
        const headers = {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${myAccounts[0].access_token}`,
          "X-GitHub-Api-Version": "2022-11-28",
        };

        await axios.put(
          `https://api.github.com/user/following/${username}`,
          {},
          { headers: headers }
        );

        const headersFriend = {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${accounts[0].access_token}`,
          "X-GitHub-Api-Version": "2022-11-28",
        };

        await axios.put(
          `https://api.github.com/user/following/${myUsername}`,
          {},
          { headers: headersFriend }
        );

        /**
         * Response
         */
        return {
          success: true,
        };
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
