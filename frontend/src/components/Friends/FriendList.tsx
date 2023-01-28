import { StackDivider, VStack } from "@chakra-ui/react";
import { Friendship } from "../../util/types";
import FriendListItem from "./FrindListItem";

interface FriendListProps {
  friends: Array<Friendship>;
}

const FriendList: React.FC<FriendListProps> = ({ friends }) => {
  return (
    <VStack mt={5} spacing={5} divider={<StackDivider />}>
      {!!friends && friends.map((friend) => <FriendListItem key={friend.id} friend={friend} />)}
    </VStack>
  );
};

export default FriendList;
