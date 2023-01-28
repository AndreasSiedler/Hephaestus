import { Avatar, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import { Friendship, Session } from "../../util/types";

interface FriendshipItemProps {
  session: Session;
  friendship: Friendship;
  loading: boolean;
  onAcceptFriendship: (friendshipId: string) => void;
}

const FriendshipItem: React.FC<FriendshipItemProps> = ({
  session,
  friendship,
  loading,
  onAcceptFriendship,
}) => {
  const {
    user: { id: myUserId },
  } = session;

  const { friend, user } = friendship;
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
        <Button>Message</Button>
      ) : (
        <Button
          ml={5}
          leftIcon={<FaGithub />}
          variant={"solid"}
          bg={"#B73CF1"}
          px={10}
          isLoading={loading}
          onClick={() => onAcceptFriendship(friendship.id)}
        >
          Accept
        </Button>
      )}
    </Flex>
  );
};

export default FriendshipItem;
