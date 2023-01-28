import { StackDivider, VStack } from "@chakra-ui/react";
import { Friendship, Session } from "../../util/types";
import FriendshipItem from "./FriendshipItem";

interface FriendListProps {
  session: Session;
  friends: Array<Friendship>;
  loading: boolean;
  onAcceptFriendship: (friendshipId: string) => void;
}

const FriendList: React.FC<FriendListProps> = ({
  session,
  friends,
  loading,
  onAcceptFriendship,
}) => {
  return (
    <VStack mt={5} spacing={5} divider={<StackDivider />}>
      {!!friends &&
        friends.map((friendship) => (
          <FriendshipItem
            key={friendship.id}
            session={session}
            friendship={friendship}
            loading={loading}
            onAcceptFriendship={onAcceptFriendship}
          />
        ))}
    </VStack>
  );
};

export default FriendList;
