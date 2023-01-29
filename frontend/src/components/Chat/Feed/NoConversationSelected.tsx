import { useQuery } from "@apollo/client";
import { Button, Flex, Stack } from "@chakra-ui/react";
import React, { useContext } from "react";
import { BiMessageSquareDots } from "react-icons/bi";
import { IModalContext, ModalContext } from "../../../context/ModalContext";
import ConversationOperations from "../../../graphql/operations/conversations";
import { ConversationsData } from "../../../util/types";

const NoConversation: React.FC = () => {
  const { data, loading, error } = useQuery<ConversationsData, null>(
    ConversationOperations.Queries.conversations
  );
  const { openModal } = useContext<IModalContext>(ModalContext);

  if (!data?.conversations || loading || error) return null;

  const { conversations } = data;

  const hasConversations = conversations.length;

  return (
    <Flex height="100%" justify="center" align="center">
      <Stack spacing={10} align="center">
        {hasConversations ? (
          <BiMessageSquareDots fontSize={90} />
        ) : (
          <Button bg="brand.100" onClick={openModal}>
            Create Conversation
          </Button>
        )}
      </Stack>
    </Flex>
  );
};
export default NoConversation;
