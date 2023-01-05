import { CreateUsernameVariables, GraphQLContext } from "../../util/types";

const resolvers = {
  Query: {
    searchUsers: () => {},
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
