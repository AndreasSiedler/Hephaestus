import { useMutation, useQuery } from "@apollo/client";
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
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Text,
} from "@chakra-ui/react";
import { Session } from "next-auth";
import React from "react";
import { toast } from "react-hot-toast";
import { BsGithub } from "react-icons/bs";
import { FaReact } from "react-icons/fa";
import { SiJavascript } from "react-icons/si";
import FriendshipOperations from "../../../graphql/operations/friendships";
import UserOperations from "../../../graphql/operations/users";
import {
  GetUserData,
  RequestFriendshipData,
  RequestFriendshipVariables,
} from "../../../util/types";

interface DevMatchProps {
  session: Session;
}

const DevMatch: React.FC<DevMatchProps> = ({ session }) => {
  const { data, refetch, loading } = useQuery<GetUserData>(UserOperations.Queries.getUser);
  const [requestFriendship, { loading: requestFriendshipLoading }] = useMutation<
    RequestFriendshipData,
    RequestFriendshipVariables
  >(FriendshipOperations.Mutations.requestFriendship);

  const onRequestFriendship = async (friendId: string) => {
    if (!friendId) return;
    try {
      const { data } = await requestFriendship({
        variables: {
          friendId,
        },
      });

      if (data?.requestFriendship.error) {
        toast.error(data?.requestFriendship.error);
        return refetch();
      }

      toast.success("Friendship requested!");
      refetch();
    } catch (error) {
      toast.error("There was an error. Please try again.");
      console.log("onRequestFriendship error", error);
    }
  };

  return (
    <HStack spacing={["0", "0", "10"]} mt="5">
      <SkeletionProfileCard />
      <Box
        bg="gray.900"
        height={500}
        width="100%"
        border="3px solid #B73CF1"
        px="6"
        py="10"
        borderRadius="xl"
        boxShadow={"0 0 12px #B73CF1"}
      >
        <Flex height={"full"} flexDir={"column"} alignItems={"center"} textAlign={"center"}>
          {loading && (
            <>
              <SkeletonCircle startColor="gray.100" endColor="gray.600" size="14" mx="auto" />
              <SkeletonText
                startColor="gray.500"
                mt="4"
                noOfLines={3}
                spacing="4"
                skeletonHeight="2"
              />
              <Skeleton w="24" height="25px" mx="auto" mt="5" />
            </>
          )}
          {!!data?.getUser ? (
            <>
              <Center>
                <Avatar size="xl" name="Segun Adebayo" src={data.getUser.image}>
                  <AvatarBadge boxSize="1em" bg="green.500" />
                </Avatar>
              </Center>

              <Heading as="h1" size="md" noOfLines={1} textAlign="center" mt="5">
                {data.getUser.username}
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
                  bgColor="#B73CF1"
                  borderColor="#B73CF1"
                  isLoading={requestFriendshipLoading}
                  onClick={() => onRequestFriendship(data.getUser.id)}
                >
                  Connect
                </Button>
              </HStack>
            </>
          ) : (
            <Text>No other users available at the moment. Please try again later.</Text>
          )}
        </Flex>
      </Box>
      <SkeletionProfileCard />
    </HStack>
  );
};
export default DevMatch;

function SkeletionProfileCard() {
  return (
    <Box
      bg="gray.900"
      display={["none", "none", "block"]}
      width="100%"
      border="1px solid #B73CF1"
      px="6"
      py="10"
      borderRadius="md"
      w="md"
      opacity="0.5"
    >
      <SkeletonCircle startColor="gray.100" endColor="gray.600" size="14" mx="auto" />
      <SkeletonText startColor="gray.500" mt="4" noOfLines={3} spacing="4" skeletonHeight="2" />
      <Skeleton w="24" height="25px" mx="auto" mt="5" />
    </Box>
  );
}
