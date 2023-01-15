import { CreateConversationVariables, GraphQLContext } from "../../util/types";

const resolvers = {
  Mutation: {
    createConversation: (_: any, args: CreateConversationVariables, context: GraphQLContext) => {
      console.log("Hello from the server", args);
    },
  },
};

export default resolvers;
