import { Container } from "@chakra-ui/react";
import { NextPageContext } from "next";
import { getSession, useSession } from "next-auth/react";
import { useState } from "react";
import DevGrid from "../components/Devs/Grid";
import DevMatch from "../components/Devs/Match";
import Header from "../components/layout/Header";
import Layout from "../components/layout/Layout";

export default function Devs() {
  const { data: session } = useSession();
  const [activeGridView, setActiveGridView] = useState(false);

  return (
    <Layout title="Bittstorm - Schaffe Platz für Neues">
      <Container maxW={"container.lg"} px={10} py={5}>
        <Header />
        {session && (
          <>
            {/* <Flex justify="center" mt="5">
              <IconButton
                onClick={() => setActiveGridView((currentValue) => !currentValue)}
                icon={<HiViewGrid />}
                aria-label={"gridview"}
              />
            </Flex> */}
            {!activeGridView ? <DevMatch session={session} /> : <DevGrid session={session} />}
          </>
        )}
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

  const { expertise, bio, name, location } = session.user;
  const isUserComplete = !!expertise && !!bio && !!name && !!location;

  if (!isUserComplete) {
    return {
      redirect: {
        permanent: false,
        destination: "/onboarding",
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
