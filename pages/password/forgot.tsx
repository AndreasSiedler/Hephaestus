import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import Layout from "../../components/layout/Layout";
import { Container } from "@chakra-ui/react";
import { getSession } from "next-auth/react";
import ForgotPassword from "../../components/password/ForgotPassword";

export const FORGOT_PASSWORD_ROUTE = "/password/forgot";

const LoginPage: NextPage = () => {
  return (
    <Layout title="Login">
      <Container maxW={"7xl"} centerContent py={"16"}>
        <ForgotPassword />
      </Container>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  if (session) {
    return {
      redirect: {
        destination: FORGOT_PASSWORD_ROUTE,
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
export default LoginPage;
