import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { BiRefresh } from "react-icons/bi";
import { BsGithub } from "react-icons/bs";
import { FaReact } from "react-icons/fa";
import { SiJavascript } from "react-icons/si";
import { GetUser } from "../../../util/types";

interface UserCardProps {
  getUser?: GetUser;
  isLoading: boolean;
  onRefreshGetUser: () => void;
  onRequestFriendship: (id: string) => void;
}

const UserCard: React.FC<UserCardProps> = ({
  getUser,
  isLoading,
  onRefreshGetUser,
  onRequestFriendship,
}) => {
  return (
    <Flex flexDir={"column"} justifyContent={"center"} height={"full"}>
      {getUser ? (
        <>
          <Center>
            <Avatar size="xl" name="Segun Adebayo" src={getUser.image}>
              <AvatarBadge boxSize="1em" bg="green.500" />
            </Avatar>
          </Center>

          <Heading as="h1" size="md" noOfLines={1} textAlign="center" mt="5">
            {getUser.username}
          </Heading>

          <Text textAlign="center" mt="2">
            Building @chakra-ui ⚡️. Design Systems and UI Engineer
          </Text>

          <HStack justifyContent="center" mt="5" spacing="5">
            <Icon as={FaReact} size="md" fontSize="3xl" />
            <Icon as={SiJavascript} size="md" fontSize="3xl" />
          </HStack>

          <Text textAlign="center" color="gray.600" fontSize="sm" mt="10">
            “Always ready to help, just contact me.”
          </Text>

          <HStack justifyContent="center" mt="10">
            <Button
              leftIcon={<BsGithub />}
              variant="solid"
              p={8}
              color="white"
              bgColor="brand.500"
              borderColor="brand.500"
              isLoading={isLoading}
              onClick={() => onRequestFriendship(getUser.id)}
            >
              Connect
            </Button>
          </HStack>
        </>
      ) : (
        <Box>
          <Heading size={"lg"}>
            No other users available at the moment. Please try again later.
          </Heading>
          <IconButton
            isLoading={isLoading}
            mt={5}
            size={"lg"}
            icon={<BiRefresh />}
            aria-label={"Refresh user match"}
            onClick={onRefreshGetUser}
          />
        </Box>
      )}
    </Flex>
  );
};

export default UserCard;
