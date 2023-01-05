import React from "react";
// import Storyblok from "../config/storyblok-service";
import Layout from "../components/layout/Layout";
import { Button, Container, Heading } from "@chakra-ui/react";
import { getSession, useSession } from "next-auth/react";
import { NextPageContext } from "next";
import { useMutation } from "@apollo/client";
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
  const session = useSession();
  const [createUsername, { data, error, loading }] = useMutation<
    CreateUsernameData,
    CreateUsernameVariables
  >(UserOperations.Mutations.createUsername);

  const onSubmit = async () => {
    await createUsername({
      variables: {
        username: "tonistark",
      },
    });
  };

  console.log(data, error, loading);

  return (
    <Layout title="Bittstorm - Schaffe Platz für Neues">
      <Container maxW={"container.2xl"} centerContent>
        <Heading>Juhu</Heading>
        <Button onClick={onSubmit}>Create username</Button>
        {JSON.stringify(session.data?.user.username)}
      </Container>
    </Layout>
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
