import { StackDivider, VStack } from "@chakra-ui/react";
import { Friendship } from "../../util/types";
import FriendListItem from "./FrindListItem";

interface FriendListProps {
  friends: Array<Friendship>;
  onAcceptFriendship: (friendshipId: string) => void;
}

const FriendList: React.FC<FriendListProps> = ({ friends, onAcceptFriendship }) => {
  return (
    <VStack mt={5} spacing={5} divider={<StackDivider />}>
      {!!friends &&
        friends.map((friendship) => (
          <FriendListItem
            key={friendship.id}
            friendship={friendship}
            onAcceptFriendship={onAcceptFriendship}
          />
        ))}
    </VStack>
  );
};

export default FriendList;
