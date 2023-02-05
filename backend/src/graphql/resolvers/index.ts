import merge from "lodash.merge";
import conversationResolvers from "./conversations";
import messageResolvers from "./messages";
import userResolvers from "./users";
import friendshipResulvers from "./friendships";
import scalarResolvers from "./scalars";
import notificationResolvers from "./notifications";

const resolvers = merge(
  {},
  userResolvers,
  scalarResolvers,
  conversationResolvers,
  messageResolvers,
  friendshipResulvers,
  notificationResolvers
);

export default resolvers;
