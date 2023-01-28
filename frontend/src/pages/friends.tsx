import { Container } from "@chakra-ui/react";
import { getSession, useSession } from "next-auth/react";
import { NextPageContext } from "next/types";
import FriendsWrapper from "../components/Friends/FriendsWrapper";
import Header from "../components/layout/Header";
import Layout from "../components/layout/Layout";

const Friends: React.FC = () => {
  const { data: session } = useSession();

  return (
    <Layout title="Bittstorm - Schaffe Platz für Neues">
      <Container maxW={"container.lg"} px={10} py={5}>
        <Header />
        {session && <FriendsWrapper />}
      </Container>
    </Layout>
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
