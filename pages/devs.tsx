import {
  Avatar,
  AvatarBadge,
  Box,
  Center,
  Container,
  Heading,
  HStack,
  Text,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Icon,
  Button,
} from "@chakra-ui/react";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Header from "../components/layout/Header";
import Layout from "../components/layout/Layout";
import { FaReact } from "react-icons/fa";
import { SiJavascript } from "react-icons/si";
import { BsGithub } from "react-icons/bs";

export default function Devs() {
  return (
    <Layout title="Bittstorm - Schaffe Platz für Neues">
      <Container maxW={"container.lg"} px={10} py={5}>
        <Header />
        <HStack spacing={["0", "0", "10"]} mt="10">
          <SkeletionProfileCard />
          <Box
            bg="gray.900"
            width="100%"
            border="3px solid #B73CF1"
            px="6"
            py="10"
            borderRadius="xl"
          >
            <Center>
              <Avatar size="2xl" name="Segun Adebayo" src="https://bit.ly/sage-adebayo">
                <AvatarBadge boxSize="1em" bg="green.500" />
              </Avatar>
            </Center>

            <Heading as="h1" size="xl" noOfLines={1} textAlign="center" mt="5">
              Segun Adebayo
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
          </Box>
          <SkeletionProfileCard />
        </HStack>
      </Container>
    </Layout>
  );
}

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

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session?.user) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  return {
    props: {},
  };
}
