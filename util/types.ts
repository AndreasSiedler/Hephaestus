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

/**
 * Backend
 */
export interface GraphQLContext {
  session: Session | null;
}
