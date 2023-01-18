import { Prisma } from "@prisma/client";
import { ApolloError } from "apollo-server-micro";
import {
  CreateConversationResponse,
  CreateConversationVariables,
  GraphQLContext,
} from "../../util/types";

const resolvers = {
  Query: {
    conversations: async (_: any, __: any, context: GraphQLContext) => {
      const { prisma, session } = context;
      if (!session?.user) {
        throw new ApolloError("Not authorized");
      }

      try {
        const conversations = prisma.conversation.findMany({
          where: {
            participants: {
              some: {
                userId: {
                  equals: session.user.id,
                },
              },
            },
          },
          include: conversationPopulated,
        });
        return conversations;
      } catch (error) {
        console.log("conversations error", error);
        throw new ApolloError("Error fetching conseversations");
      }
    },
  },
  Mutation: {
    createConversation: async (
      _: any,
      args: CreateConversationVariables,
      context: GraphQLContext
    ): Promise<CreateConversationResponse> => {
      const { participants } = args;
      const { prisma, session } = context;

      if (!session?.user) {
        throw new ApolloError("Not authorized");
      }

      try {
        const conversation = await prisma.conversation.create({
          data: {
            participants: {
              createMany: {
                data: participants.map((id) => {
                  return {
                    userId: id,
                    hasSeenLatestMessage: id === session.user.id,
                  };
                }),
              },
            },
          },
          include: conversationPopulated,
        });
        return {
          conversationId: conversation.id,
        };
      } catch (error) {
        console.log("createConversation error", error);
        throw new ApolloError("Error creating conversation");
      }
    },
  },
};

const participantPopulated = Prisma.validator<Prisma.ConversationParticipantInclude>()({
  user: {
    select: {
      id: true,
      name: true,
      username: true,
      image: true,
    },
  },
});

const conversationPopulated = Prisma.validator<Prisma.ConversationInclude>()({
  participants: {
    include: participantPopulated,
  },
  latestMessage: {
    include: {
      sender: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  },
});

export default resolvers;
