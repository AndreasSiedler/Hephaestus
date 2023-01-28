import { ConversationPopulated, MessagePopulated } from "../../../backend/src/util/types";

/**
 * Next Auth
 */
export interface Session {
  user: User;
}

export interface User {
  id: string;
  username: string;
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

export interface GetUserData {
  getUser: {
    id: string;
    username: string;
    name: string;
    image: string;
  };
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
