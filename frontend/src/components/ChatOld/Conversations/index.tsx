import { useQuery } from "@apollo/client";
import { Button, StackDivider, useDisclosure, VStack } from "@chakra-ui/react";
import AddConversationDialog from "./AddConversationDialog";
import ConversationOperations from "../../../graphql/operations/conversations";
import ConversationItem from "./ConversationItem";
import { ConversationsData } from "../../../util/types";

type ConversationsProps = {};

export default function Conversations({}: ConversationsProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    data: conversationsData,
    loading,
    error,
  } = useQuery<ConversationsData>(ConversationOperations.Queries.conversations);

  return (
    <>
      <VStack
        width={{
          base: "100%",
          md: 600,
        }}
        spacing="3"
        divider={<StackDivider />}
      >
        <Button width="full" onClick={onOpen}>
          Add Conversation
        </Button>
        {conversationsData &&
          conversationsData.conversations.map((conversation) => (
            <ConversationItem key={conversation.id} conversation={conversation} />
          ))}
      </VStack>
      <AddConversationDialog isOpen={isOpen} onClose={onClose} />
    </>
  );
}
