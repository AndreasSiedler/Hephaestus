import { PrismaClient } from "@prisma/client";
import { Session } from "next-auth";

export interface GithubUser {
  login: string;
}

/**
 * Users
 */
export interface CreateUsernameVariables {
  username: string;
}

export interface CreateUsernameData {
  createUsername: {
    success: boolean;
    error: string;
  };
}

export interface SearchUsersValriables {
  username: string;
}

export interface SearchUsersData {
  searchUsers: SearchedUser[];
}

export interface SearchedUser {
  id: string;
  name: string;
  username: string;
  image: string;
}

/**
 * Conversation
 */
export interface CreateConversationData {
  createConversation: {
    success: boolean;
    error: string;
  };
}

export interface CreateConversationVariables {
  participants: String[];
}

/**
 * GraphQL
 */
export interface GraphQLContext {
  session: Session | null;
  prisma: PrismaClient;
}
