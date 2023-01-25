import { GraphQLError } from "graphql";
import { CreateUsernameVariables, GraphQLContext, SearchUsersValriables } from "../../util/types";

const resolvers = {
  Query: {
    searchUsers: async (_: any, args: SearchUsersValriables, context: GraphQLContext) => {
      const { username: searchedUsername } = args;
      const { prisma, session } = context;

      if (!session?.user) {
        throw new GraphQLError("Not authorized");
      }

      const myUsername = session.user.username;

      try {
        const users = await context.prisma.user.findMany({
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
    createUsername: (_: any, args: CreateUsernameVariables, context: GraphQLContext) => {
      console.log(context);
      return {
        error: "Hell no",
        success: true,
      };
    },
  },
};

export default resolvers;
