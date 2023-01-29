import { Container, Heading } from "@chakra-ui/react";
import { getSession, useSession } from "next-auth/react";
import { NextPageContext } from "next/types";
import Header from "../components/layout/Header";
import Layout from "../components/layout/Layout";
import ProfileUpdate from "../components/Profile/UpdateProile";

const ProfilePage: React.FC = () => {
  const session = useSession();

  return (
    <Layout title="Update your profile">
      <Header />
      <Container maxW={"container.sm"} px={10} py={5}>
        <Heading maxW="md" as={"h1"} textAlign="center" margin={"auto"}>
          Hi {session.data?.user.name ? session.data?.user.name : session.data?.user.username}! 👋
          You are almost done..
        </Heading>
        <ProfileUpdate defaultValues={session.data?.user} />
      </Container>
    </Layout>
  );
};

export default ProfilePage;

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
