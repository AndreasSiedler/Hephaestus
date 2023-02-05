import { Avatar, Button, Flex, Heading, StackDivider, Text, VStack } from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import { Friendship } from "../../util/types";

interface FriendListProps {
  friendships: Array<Friendship>;
  loading: boolean;
  onAcceptFriendship: (friendshipId: string) => void;
}

const WaitingFriends: React.FC<FriendListProps> = ({
  friendships,
  loading,
  onAcceptFriendship,
}) => {
  return (
    <VStack mt={5} spacing={5} divider={<StackDivider />}>
      {!!friendships &&
        friendships.map((friendship) => {
          const { id, user } = friendship;
          return (
            <Flex key={id} w={"full"} justifyContent={"space-between"} alignItems={"center"}>
              <Flex>
                <Avatar name="Segun Adebayo" src={user.image} />
                <Flex ml={3} flexDir={"column"} justifyContent={"center"}>
                  <Heading size={"sm"}>{user.name}</Heading>
                  <Text fontSize={"sm"} noOfLines={1}>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr
                  </Text>
                </Flex>
              </Flex>
              <Button
                ml={5}
                leftIcon={<FaGithub />}
                variant={"solid"}
                bg={"brand.500"}
                px={10}
                isLoading={loading}
                onClick={() => onAcceptFriendship(id)}
              >
                Accept
              </Button>
            </Flex>
          );
        })}
    </VStack>
  );
};

export default WaitingFriends;
