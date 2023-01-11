import { Box, Container, Flex } from "@chakra-ui/react";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useState } from "react";
import Header from "../components/layout/Header";
import Layout from "../components/layout/Layout";

export default function Chat() {
  const [activeGridView, setActiveGridView] = useState(false);

  return (
    <Layout title="Bittstorm - Schaffe Platz für Neues">
      <Container maxW={"container.lg"} px={10} py={5}>
        <Header />
        <Flex>Chat</Flex>
      </Container>
    </Layout>
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
