import { HStack, Flex, Avatar, Heading, Icon, Box, Text, AvatarGroup } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { BsCheckAll } from "react-icons/bs";
import { ConversationPopulated } from "../../../util/types";

type ConversationItemProps = {
  conversation: ConversationPopulated;
};

export default function ConversationItem({ conversation }: ConversationItemProps) {
  const session = useSession();
  return (
    <HStack justify="space-between" w="full">
      <Flex>
        <AvatarGroup>
          {conversation.participants
            .filter((participant) => participant.user.username !== session.data?.user.username)
            .map((participant) => (
              <Avatar name={participant.user.username} src={participant.user.image} />
            ))}
        </AvatarGroup>
        <Flex ml="2" flexDir="column" justify="center">
          <Heading size="xs">Ragehov</Heading>
          <Text as="span" fontSize="10">
            Dinner?
          </Text>
        </Flex>
      </Flex>
      <Flex flexDir="column" align="end">
        <Box as="span" fontSize="xx-small" color="gray.500">
          Today, 8:56pm
        </Box>
        <Icon color="#B73CF1" fontSize="20" as={BsCheckAll} />
      </Flex>
    </HStack>
  );
}
