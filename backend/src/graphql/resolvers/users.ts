import { User } from "@prisma/client";
import { GraphQLError } from "graphql";
import { verifyAndCreateUsername } from "../../util/functions";
import { CreateUsernameResponse, GraphQLContext } from "../../util/types";

const resolvers = {
  Query: {
    getUser: async function getUser(_: any, args: { username: string }, context: GraphQLContext) {
      const { prisma, session } = context;
      if (!session?.user) {
        throw new GraphQLError("Not authorized");
      }

      const {
        user: { id: myUserId, username: myUsername },
      } = session;

      try {
        /**
         * Get random user which is not a friend already
         */
        const user = await prisma.user.findFirst({
          where: {
            username: {
              not: myUsername,
            },
            friendsOf: {
              none: {
                userId: myUserId,
              },
            },
            friends: {
              none: {
                friendId: myUserId,
              },
            },
          },
          select: {
            id: true,
            username: true,
            name: true,
            image: true,
          },
        });

        return user;
      } catch (error: any) {
        console.log("error", error);
        throw new GraphQLError(error?.message);
      }
    },
    searchUsers: async function searchUsers(
      _: any,
      args: { username: string },
      context: GraphQLContext
    ): Promise<Array<User>> {
      const { username: searchedUsername } = args;
      const { prisma, session } = context;

      if (!session?.user) {
        throw new GraphQLError("Not authorized");
      }

      const {
        user: { username: myUsername },
      } = session;

      try {
        const users = await prisma.user.findMany({
          where: {
            username: {
              contains: searchedUsername,
              not: myUsername,
            },
          },
        });

        return users;
      } catch (error: any) {
        console.log("error", error);
        throw new GraphQLError(error?.message);
      }
    },
  },
  Mutation: {
    updateUser: async function updateUser(
      _: any,
      args: {
        name?: string;
        email?: string;
        bio?: string;
        location?: string;
        blog?: string;
        status?: string;
        syncGithub?: boolean;
      },
      context: GraphQLContext
    ) {
      const { session, prisma } = context;
      const { name, email, bio, location, blog, status, syncGithub } = args;

      if (!session?.user) {
        return {
          error: "Not authorized",
        };
      }

      const {
        user: { id: userId },
      } = session;

      try {
        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            name: name,
            email: email,
            bio: bio,
            location: location,
            blog: blog,
          },
        });

        return {
          success: true,
        };
      } catch (error: any) {
        console.log("updateUser error", error);
        throw new GraphQLError(error?.message);
      }
    },
    createUsername: async function createUsername(
      _: any,
      args: { username: string },
      context: GraphQLContext
    ): Promise<CreateUsernameResponse> {
      const { session, prisma } = context;

      if (!session?.user) {
        return {
          error: "Not authorized",
        };
      }

      const { id } = session.user;
      const { username } = args;

      return await verifyAndCreateUsername({ userId: id, username }, prisma);
    },
  },
};

export default resolvers;
