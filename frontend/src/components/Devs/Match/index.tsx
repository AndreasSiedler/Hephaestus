import { useQuery } from "@apollo/client";
import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Center,
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
import { BsGithub } from "react-icons/bs";
import { FaReact } from "react-icons/fa";
import { SiJavascript } from "react-icons/si";
import { GetUserData } from "../../../util/types";
import UserOperations from "../../../graphql/operations/users";

interface DevMatchProps {
  session: Session;
}

const DevMatch: React.FC<DevMatchProps> = ({ session }) => {
  const { data, loading } = useQuery<GetUserData>(UserOperations.Queries.getUser);

  return (
    <HStack spacing={["0", "0", "10"]} mt="5">
      <SkeletionProfileCard />
      <Box bg="gray.900" width="100%" border="3px solid #B73CF1" px="6" py="10" borderRadius="xl">
        {!!data ? (
          <>
            <Center>
              <Avatar size="2xl" name="Segun Adebayo" src={data.getUser.image}>
                <AvatarBadge boxSize="1em" bg="green.500" />
              </Avatar>
            </Center>

            <Heading as="h1" size="xl" noOfLines={1} textAlign="center" mt="5">
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
              <Button variant="solid" p={8} borderColor="#B73CF1" color="#B73CF1">
                Cancel
              </Button>
              <Button
                leftIcon={<BsGithub />}
                variant="solid"
                p={8}
                color="white"
                bgColor="#B73CF1"
                borderColor="#B73CF1"
              >
                Connect
              </Button>
            </HStack>
          </>
        ) : (
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
