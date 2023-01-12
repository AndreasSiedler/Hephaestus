import { Container, Flex } from "@chakra-ui/react";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useState } from "react";
import Conversations from "../components/Chat/Conversations";
import Feed from "../components/Chat/Feed";
import Header from "../components/layout/Header";
import Layout from "../components/layout/Layout";

export default function Chat() {
  const [activeGridView, setActiveGridView] = useState(false);

  return (
    <Layout title="Bittstorm - Schaffe Platz für Neues">
      <Container height="100vh" maxW={"container.lg"} py={5}>
        <Header />
        <Flex>
          <Conversations />
          <Feed />
        </Flex>
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
