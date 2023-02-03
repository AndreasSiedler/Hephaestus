import conversationTypeDefs from "./conversations";
import friendshipsTypeDefs from "./friendships";
import messageTypeDefs from "./messages";
import skillTypeDefs from "./skills";
import userTypeDefs from "./users";

const typeDefs = [
  userTypeDefs,
  skillTypeDefs,
  conversationTypeDefs,
  messageTypeDefs,
  friendshipsTypeDefs,
];

export default typeDefs;
