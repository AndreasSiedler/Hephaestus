import { ConversationPopulated, MessagePopulated } from "../../../backend/src/util/types";

/**
 * Next Auth
 */
export interface Session {
  user: User;
}
export interface GithubPublicUser {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name?: string;
  company?: string;
  blog?: string;
  location?: string;
  email?: null;
  hireable?: true;
  bio?: string;
  twitter_username?: null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  status: string;
  expertise: string;
  username: string;
  name: string;
  email: string;
  bio: string;
  location: string;
  blog: string;
  company: string;
  hireable: boolean;
  followers: number;
  following: number;
  createdAtGithub: string;
  updatedAtGithub: string;
}

/**
 * Users
 */

export interface PopulatedUserSkill {
  name: string;
  weight: number;
}

export interface PopulatedUser {
  id: string;
  expertise: string;
  name?: string;
  username: string;
  email?: string;
  location?: string;
  bio?: string;
  image?: string;
  skills?: PopulatedUserSkill[];
}

export interface PopulatedUserData {
  populatedUser: PopulatedUser;
}

export interface CreateUsernameVariables {
  username: string;
}

export interface CreateUsernameData {
  createUsername: {
    success: boolean;
    error: string;
  };
}

export interface GetUser {
  id: string;
  username: string;
  name: string;
  image: string;
}

export interface GetUserData {
  getUser?: GetUser;
}

export interface SearchUsersInputs {
  username: string;
}

export interface SearchUsersData {
  searchUsers: Array<SearchedUser>;
}

export interface SearchedUser {
  id: string;
  username: string;
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  bio?: string;
  location?: string;
  blog?: string;
  status?: string;
  syncGithub?: boolean;
  skills: {
    name: string;
    weight?: number;
  }[];
}

/**
 * Messages
 */
export interface MessagesData {
  messages: Array<MessagePopulated>;
}

export interface MessagesVariables {
  conversationId: string;
}

export interface SendMessageVariables {
  id: string;
  conversationId: string;
  senderId: string;
  body: string;
}

export interface MessagesSubscriptionData {
  subscriptionData: {
    data: {
      messageSent: MessagePopulated;
    };
  };
}

/**
 * Conversations
 */
export interface CreateConversationData {
  createConversation: {
    conversationId: string;
  };
}

export interface ConversationsData {
  conversations: Array<ConversationPopulated>;
}

export interface ConversationCreatedSubscriptionData {
  subscriptionData: {
    data: {
      conversationCreated: ConversationPopulated;
    };
  };
}

export interface ConversationUpdatedData {
  conversationUpdated: {
    conversation: Omit<ConversationPopulated, "latestMessage"> & {
      latestMessage: MessagePopulated;
    };
    addedUserIds: Array<string> | null;
    removedUserIds: Array<string> | null;
  };
}

export interface ConversationDeletedData {
  conversationDeleted: {
    id: string;
  };
}

/**
 *  Friendships
 */
export interface RequestFriendshipVariables {
  friendId: string;
}
export interface RequestFriendshipData {
  requestFriendship: {
    success: boolean;
    error: string;
  };
}

export interface AcceptFriendshipVariables {
  friendshipId: string;
}

export interface AcceptFriendshipData {
  acceptFriendship: {
    success: boolean;
    error: string;
  };
}
export interface CancelFriendshipVariables {
  friendshipId: string;
}

export interface CancelFriendshipData {
  cancelFriendship: {
    success: boolean;
    error: string;
  };
}

export interface FriendshipUserPopulated {
  id: string;
  username: string;
  name: string;
  image: string;
}

export interface Friendship {
  id: string;
  status: boolean;
  user: FriendshipUserPopulated;
  friend: FriendshipUserPopulated;
  createdAt: string;
}

export interface FriedshipsData {
  friendships: Array<Friendship>;
}

export interface WaitingFriendshipsData {
  waitingFriendships: Array<Friendship>;
}

/**
 * Notifications
 */

export interface Notification {
  id: string;
  isRead: boolean;
  sender: {
    id: string;
    name?: string;
    username: string;
    image: string;
  };
  type: "FRIENDSHIP_CREATE";
  createdAt: string;
}

export interface NotificationsData {
  notifications: Array<Notification>;
}
