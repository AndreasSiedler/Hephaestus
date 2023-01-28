import {
  Avatar,
  Button,
  Container,
  Flex,
  Heading,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import { getSession, useSession } from "next-auth/react";
import { NextPageContext } from "next/types";
import { FaGithub } from "react-icons/fa";
import Header from "../components/layout/Header";
import Layout from "../components/layout/Layout";

type Props = {};

const Friends = (props: Props) => {
  const { data: session } = useSession();

  return (
    <Layout title="Bittstorm - Schaffe Platz für Neues">
      <Container maxW={"container.lg"} px={10} py={5}>
        <Header />
        {session && (
          <>
            <Heading size={"lg"} as={"h2"}>
              Waiting
            </Heading>
            <VStack mt={5} spacing={5} divider={<StackDivider />}>
              <FriendListItem />
              <FriendListItem />
              <FriendListItem />
            </VStack>
            <Heading mt={10} size={"lg"} as={"h2"}>
              Friends
            </Heading>
            <VStack mt={5} spacing={5} divider={<StackDivider />}>
              <FriendListItem />
              <FriendListItem />
              <FriendListItem />
            </VStack>
          </>
        )}
      </Container>
    </Layout>
  );
};

const FriendListItem = () => {
  return (
    <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"}>
      <Flex>
        <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
        <Flex ml={3} flexDir={"column"} justifyContent={"center"}>
          <Heading size={"sm"}>Segun Adebayo</Heading>
          <Text fontSize={"sm"} noOfLines={1}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr
          </Text>
        </Flex>
      </Flex>
      <Button ml={5} leftIcon={<FaGithub />} variant={"solid"} bg={"#B73CF1"} px={10}>
        Accept
      </Button>
    </Flex>
  );
};

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
    props: {
      session,
    },
  };
}

export default Friends;
