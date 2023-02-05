import conversationTypeDefs from "./conversations";
import friendshipsTypeDefs from "./friendships";
import messageTypeDefs from "./messages";
import skillTypeDefs from "./skills";
import userTypeDefs from "./users";
import notificationTypeDefs from "./notifications";

const typeDefs = [
  userTypeDefs,
  skillTypeDefs,
  conversationTypeDefs,
  messageTypeDefs,
  friendshipsTypeDefs,
  notificationTypeDefs,
];

export default typeDefs;
