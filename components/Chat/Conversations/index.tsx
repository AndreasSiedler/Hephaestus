import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  StackDivider,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { BsCheckAll } from "react-icons/bs";
import AddConversationDialog from "./AddConversationDialog";

type ConversationsProps = {};

export default function Conversations({}: ConversationsProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <VStack
        bg="gray.900"
        width={300}
        height={500}
        border="1px solid"
        borderColor="gray.600"
        borderRadius={10}
        spacing="3"
        p="4"
        divider={<StackDivider />}
      >
        <Button width="full" onClick={onOpen}>
          Add Conversation
        </Button>
        <Conversation />
        <Conversation />
        <Conversation />
      </VStack>
      <AddConversationDialog isOpen={isOpen} onClose={onClose} />
    </>
  );
}

function Conversation() {
  return (
    <HStack justify="space-between" w="full">
      <Flex>
        <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
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
