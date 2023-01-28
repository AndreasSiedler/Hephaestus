import { StackDivider, VStack } from "@chakra-ui/react";
import { Friendship, Session } from "../../util/types";
import FriendshipItem from "./FriendshipItem";

interface FriendListProps {
  session: Session;
  friends: Array<Friendship>;
  loading: boolean;
  cancelFriendshipLoading: boolean;
  onAcceptFriendship: (friendshipId: string) => void;
  onCancelFriendship: (friendshipId: string) => void;
}

const FriendList: React.FC<FriendListProps> = ({
  session,
  friends,
  loading,
  cancelFriendshipLoading,
  onAcceptFriendship,
  onCancelFriendship,
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
            cancelFriendshipLoading={cancelFriendshipLoading}
            onAcceptFriendship={onAcceptFriendship}
            onCancelFriendship={onCancelFriendship}
          />
        ))}
    </VStack>
  );
};

export default FriendList;
