import { CheckIcon } from "@chakra-ui/icons";
import { VStack, Flex, Avatar, Box, Text, Button } from "@chakra-ui/react";
import React from "react";
import { SearchedUser } from "../../../../util/types";

type Props = {
  searchedUsers: SearchedUser[];
  participants: SearchedUser[];
  selectUser: (user: SearchedUser) => void;
};

const SearchedUserList = ({ searchedUsers, participants, selectUser }: Props) => {
  const isAlreadyParticipant = (searchedUser: SearchedUser) => {
    return Boolean(participants.find((item) => item.id === searchedUser.id));
  };

  return (
    <VStack p={5} bg={"gray.800"} borderRadius={10} mt={5} height={300} overflow={"scroll"}>
      {searchedUsers.length !== 0 &&
        searchedUsers.map((searchedUser) => (
          <Flex key={searchedUser.id} w={"full"} justify={"space-between"} align={"center"}>
            <Box>
              <Flex>
                <Avatar src={searchedUser.image} mr={2} />
                <Flex flexDir={"column"} justify={"center"}>
                  <Text>{searchedUser.username}</Text>
                  {searchedUser.name && (
                    <Text fontSize={"sm"} color={"gray.400"}>
                      {searchedUser.name}
                    </Text>
                  )}
                </Flex>
              </Flex>
            </Box>
            <Button onClick={() => selectUser(searchedUser)}>
              {isAlreadyParticipant(searchedUser) ? <CheckIcon /> : "Select"}
            </Button>
          </Flex>
        ))}
    </VStack>
  );
};

export default SearchedUserList;
