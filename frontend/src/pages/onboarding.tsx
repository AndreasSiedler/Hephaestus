import { Container } from "@chakra-ui/react";
import { getSession, useSession } from "next-auth/react";
import { NextPageContext } from "next/types";
import Header from "../components/layout/Header";
import Layout from "../components/layout/Layout";
import Onboarding from "../components/Onboarding";

const steps = [{ label: "Step 1" }, { label: "Step 2" }, { label: "Step 3" }];

const ProfilePage: React.FC = () => {
  const session = useSession();

  return (
    <Layout title="Update your profile">
      <Container maxW={"container.lg"} px={10} py={5}>
        <Header />
        <Onboarding />
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
