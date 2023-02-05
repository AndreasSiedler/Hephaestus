import { DeleteIcon } from "@chakra-ui/icons";
import { Avatar, Button, Flex, Heading, IconButton, Text } from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import { Friendship, Session } from "../../util/types";

interface FriendshipItemProps {
  session: Session;
  friendship: Friendship;
  loading: boolean;
  cancelFriendshipLoading: boolean;
  onAcceptFriendship: (friendshipId: string) => void;
  onCancelFriendship: (friendshipId: string) => void;
}

const FriendshipItem: React.FC<FriendshipItemProps> = ({
  session,
  friendship,
  loading,
  cancelFriendshipLoading,
  onAcceptFriendship,
  onCancelFriendship,
}) => {
  console.log(friendship);
  const {
    user: { id: myUserId },
  } = session;

  const { id: friendshipId, friend, user } = friendship;
  const myFriend = friend.id !== myUserId ? friend : user;

  return (
    <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"}>
      <Flex>
        <Avatar name="Segun Adebayo" src={myFriend.image} />
        <Flex ml={3} flexDir={"column"} justifyContent={"center"}>
          <Heading size={"sm"}>{myFriend.name}</Heading>
          <Text fontSize={"sm"} noOfLines={1}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr
          </Text>
        </Flex>
      </Flex>
      {friendship.status ? (
        <Flex>
          <Button>Message</Button>
          <IconButton
            ml={1}
            icon={<DeleteIcon />}
            aria-label={"Cancel friendship"}
            isLoading={cancelFriendshipLoading}
            onClick={() => onCancelFriendship(friendshipId)}
          />
        </Flex>
      ) : (
        <Button
          ml={5}
          leftIcon={<FaGithub />}
          variant={"solid"}
          bg={"brand.500"}
          px={10}
          isLoading={loading}
          onClick={() => onAcceptFriendship(friendshipId)}
        >
          Accept
        </Button>
      )}
    </Flex>
  );
};

export default FriendshipItem;
