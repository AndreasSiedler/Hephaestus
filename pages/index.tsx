import React from "react";
// import Storyblok from "../config/storyblok-service";
import Layout from "../components/layout/Layout";
import { Container, Heading } from "@chakra-ui/react";
import { getSession, useSession } from "next-auth/react";
import { NextPageContext } from "next";

interface HomeProps {}

/**
 * Renders index (home) page
 * @param {any} story
 * @param {any} preview
 * @return {ReactElement}
 */
export default function Home({}: HomeProps) {
  const session = useSession();

  return (
    <Layout title="Bittstorm - Schaffe Platz für Neues">
      <Container maxW={"container.2xl"} centerContent>
        <Heading>Juhu</Heading>
        {JSON.stringify(session)}
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
