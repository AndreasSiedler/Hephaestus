import { Avatar, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import { Friendship } from "../../util/types";

interface FriendListItemProps {
  friendship: Friendship;
  onAcceptFriendship: (friendshipId: string) => void;
}

const FriendListItem: React.FC<FriendListItemProps> = ({ friendship, onAcceptFriendship }) => {
  return (
    <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"}>
      <Flex>
        <Avatar name="Segun Adebayo" src={friendship.user.image} />
        <Flex ml={3} flexDir={"column"} justifyContent={"center"}>
          <Heading size={"sm"}>{friendship.user.name}</Heading>
          <Text fontSize={"sm"} noOfLines={1}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr
          </Text>
        </Flex>
      </Flex>
      <Button
        ml={5}
        leftIcon={<FaGithub />}
        variant={"solid"}
        bg={"#B73CF1"}
        px={10}
        onClick={() => onAcceptFriendship(friendship.id)}
      >
        Accept
      </Button>
    </Flex>
  );
};

export default FriendListItem;
