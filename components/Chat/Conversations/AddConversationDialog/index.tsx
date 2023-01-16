import { useLazyQuery, useMutation } from "@apollo/client";
import { SearchIcon } from "@chakra-ui/icons";
import {
  Button,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import UserOperations from "../../../../graphql/operations/user";
import ConversationOperations from "../../../../graphql/operations/conversation";
import {
  CreateConversationData,
  CreateConversationVariables,
  SearchedUser,
  SearchUsersData,
  SearchUsersValriables,
} from "../../../../util/types";
import Participants from "./Participants";
import SearchedUserList from "./SearchedUserList";
import { useSession } from "next-auth/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const AddConversationDialog = ({ isOpen, onClose }: Props) => {
  const [searchedUsername, setSearchedUsername] = useState("");
  const [participants, setParticipants] = useState<SearchedUser[]>([]);
  const session = useSession();
  const toast = useToast();

  const [searchUsers, { data: searchedUsers, loading, error }] = useLazyQuery<
    SearchUsersData,
    SearchUsersValriables
  >(UserOperations.Queries.searchUsers);

  const [createConversation, { data }] = useMutation<
    CreateConversationData,
    CreateConversationVariables
  >(ConversationOperations.Mutations.createConversation);

  const searchUser = async () => {
    await searchUsers({
      variables: {
        username: searchedUsername,
      },
    });
  };

  const selectUser = (selectedUser: SearchedUser) => {
    // Check if selected user is already a selected participant
    const isParticipant = participants.find((item) => item.id === selectedUser.id);

    if (isParticipant) return;
    setParticipants((prevParticipants) => {
      return [...prevParticipants, selectedUser];
    });
  };

  const removeParticipant = (removedParticipant: SearchedUser) => {
    setParticipants((prevParticipants) => {
      const newParticipants = prevParticipants.filter((item) => item.id !== removedParticipant.id);
      return newParticipants;
    });
  };

  const onCreateConversation = () => {
    try {
      const participantIds = [session.data?.user.id!, ...participants.map((p) => p.id)];
      createConversation({
        variables: {
          participants: participantIds,
        },
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Conversation</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <InputGroup size="md">
            <Input
              type="text"
              placeholder="Search by username"
              onChange={(event) => setSearchedUsername(event.target.value)}
            />
            <InputRightElement>
              <IconButton
                icon={<SearchIcon />}
                size="sm"
                onClick={searchUser}
                aria-label={"Search icon"}
              />
            </InputRightElement>
          </InputGroup>
          {participants && (
            <Participants participants={participants} removeParticipant={removeParticipant} />
          )}
          {searchedUsers && (
            <SearchedUserList
              searchedUsers={searchedUsers.searchUsers}
              participants={participants}
              selectUser={selectUser}
            />
          )}
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button bgColor="#B73CF1" variant="solid" onClick={onCreateConversation}>
            Add Conversation
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddConversationDialog;
