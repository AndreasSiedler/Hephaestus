// import Storyblok from "../config/storyblok-service";
import { useMutation } from "@apollo/client";
import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  SimpleGrid,
  SkeletonCircle,
  SkeletonText,
  Text,
} from "@chakra-ui/react";
import { NextPageContext } from "next";
import { getSession, signIn } from "next-auth/react";
import { useState } from "react";
import { BsGithub } from "react-icons/bs";
import Header from "../components/layout/Header";
import Layout from "../components/layout/Layout";
import UserOperations from "../graphql/operations/user";
import { CreateUsernameData, CreateUsernameVariables } from "../util/types";

interface HomeProps {}

/**
 * Renders index (home) page
 * @param {any} story
 * @param {any} preview
 * @return {ReactElement}
 */
export default function Home({}: HomeProps) {
  const [createUsername] = useMutation<CreateUsernameData, CreateUsernameVariables>(
    UserOperations.Mutations.createUsername
  );

  const [pageLoading, setLoading] = useState(false);

  const handleSignin = async () => {
    try {
      setLoading(true);
      await signIn("github").then(() => console.log("done"));
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Layout title="Bittstorm - Schaffe Platz für Neues">
      <Container maxW={"container.lg"} px={10} py={5}>
        <Header />
        <Center flexDir="column" mt="16">
          <BsGithub size={40} />
          <Heading as={"h1"}>Welcome to Gitbud</Heading>
          <Text maxW="md" textAlign="center" textColor="gray.500" mt={3}>
            The Dev community to connect, collaborate and to improve. Enjoy your stay”
          </Text>
        </Center>
        <SimpleGrid
          display={["none", "flex"]}
          columns={[1, 3]}
          mt={10}
          spacing={["10", "10", "32"]}
        >
          <SkeletonFeature />
          <SkeletonFeature />
          <SkeletonFeature />
        </SimpleGrid>
        <Center>
          <Button
            isLoading={pageLoading}
            leftIcon={<BsGithub />}
            variant="outline"
            p={8}
            mt={10}
            borderColor="#B73CF1"
            color="#B73CF1"
            onClick={handleSignin}
          >
            Signin with Github
          </Button>
        </Center>
      </Container>
    </Layout>
  );
}

function SkeletonFeature() {
  return (
    <Box width="100%">
      <SkeletonCircle startColor="gray.100" endColor="gray.600" size="14" mx="auto" />
      <SkeletonText startColor="gray.500" mt="4" noOfLines={3} spacing="4" skeletonHeight="2" />
    </Box>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
