import { Avatar, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import { Friendship } from "../../util/types";

interface FriendListItemProps {
  friend: Friendship;
}

const FriendListItem: React.FC<FriendListItemProps> = ({ friend }) => {
  return (
    <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"}>
      <Flex>
        <Avatar name="Segun Adebayo" src={friend.user.image} />
        <Flex ml={3} flexDir={"column"} justifyContent={"center"}>
          <Heading size={"sm"}>{friend.user.name}</Heading>
          <Text fontSize={"sm"} noOfLines={1}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr
          </Text>
        </Flex>
      </Flex>
      <Button ml={5} leftIcon={<FaGithub />} variant={"solid"} bg={"#B73CF1"} px={10}>
        Accept
      </Button>
    </Flex>
  );
};

export default FriendListItem;
