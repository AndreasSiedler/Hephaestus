import { CloseIcon, DeleteIcon } from "@chakra-ui/icons";
import { Avatar, AvatarBadge, HStack, IconButton } from "@chakra-ui/react";
import React from "react";
import { SearchedUser } from "../../../../util/types";

type Props = {
  participants: SearchedUser[];
  removeParticipant: (participant: SearchedUser) => void;
};

const Participants = ({ participants, removeParticipant }: Props) => {
  return (
    <HStack mt={5}>
      {participants.length !== 0 &&
        participants.map((participant) => (
          <Avatar size={"lg"} key={participant.id} src={participant.image}>
            <AvatarBadge
              _hover={{
                cursor: "pointer",
              }}
              p={2}
              bg={"black"}
              onClick={() => removeParticipant(participant)}
            >
              <CloseIcon fontSize={"xs"} />
            </AvatarBadge>
          </Avatar>
        ))}
    </HStack>
  );
};

export default Participants;
