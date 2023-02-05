import { useMutation, useQuery } from "@apollo/client";
import {
  Box,
  Button,
  Flex,
  HStack,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Text,
} from "@chakra-ui/react";
import { Session } from "next-auth";
import NextLink from "next/link";
import React from "react";
import { toast } from "react-hot-toast";
import FriendshipOperations from "../../../graphql/operations/friendships";
import UserOperations from "../../../graphql/operations/users";
import {
  GetUserData,
  RequestFriendshipData,
  RequestFriendshipVariables,
} from "../../../util/types";
import UserCard from "./UserCard";

interface DevMatchProps {
  session: Session;
}

const DevMatch: React.FC<DevMatchProps> = ({ session }) => {
  const {
    data,
    loading: getUserLoading,
    error,
    refetch,
  } = useQuery<GetUserData>(UserOperations.Queries.getUser);
  const [requestFriendship, { loading: requestFriendshipLoading }] = useMutation<
    RequestFriendshipData,
    RequestFriendshipVariables
  >(FriendshipOperations.Mutations.requestFriendship);

  const onRequestFriendship = async (friendId: string) => {
    if (!friendId) return;
    try {
      const { data: response } = await requestFriendship({
        variables: {
          friendId,
        },
      });

      if (response?.requestFriendship.error) {
        toast.error(response?.requestFriendship.error);
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
        border={"3px solid"}
        borderColor={"brand.500"}
        px="6"
        py="10"
        borderRadius="xl"
        boxShadow={"0 0 12px #B73CF1"}
      >
        <Flex height={"full"} flexDir={"column"} alignItems={"center"} textAlign={"center"}>
          {getUserLoading && (
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
          {error && (
            <Flex flexDir={"column"} mt={200} alignItems={"center"}>
              <Text textAlign={"center"} maxW={"xl"}>
                Ups, something went wrong. Please try it again or write me a message.
              </Text>
              <HStack justify={"center"} mt={5}>
                <NextLink href={"/chat?participants=andreassiedler"}>
                  <Button size={"xl"}>Message</Button>
                </NextLink>
                <Button size={"xl"} colorScheme={"brand"}>
                  Reload
                </Button>
              </HStack>
            </Flex>
          )}
          {data && (
            <UserCard
              getUser={data.getUser}
              isLoading={requestFriendshipLoading || getUserLoading}
              onRefreshGetUser={() => refetch()}
              onRequestFriendship={onRequestFriendship}
            />
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
      border={"1px solid"}
      borderColor={"brand.500"}
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
