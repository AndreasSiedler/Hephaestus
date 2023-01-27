import merge from "lodash.merge";
import conversationResolvers from "./conversations";
import messageResolvers from "./messages";
import userResolvers from "./users";
import friendshipResulvers from "./friendships";
import scalarResolvers from "./scalars";

const resolvers = merge(
  {},
  userResolvers,
  scalarResolvers,
  conversationResolvers,
  messageResolvers,
  friendshipResulvers
);

export default resolvers;
