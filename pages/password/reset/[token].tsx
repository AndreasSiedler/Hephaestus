import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import Layout from "../../../components/layout/Layout";
import { Container } from "@chakra-ui/react";
import { getSession } from "next-auth/react";
import { USER_UPDATE_ROUTE } from "../../user/update";
import ResetPassword from "../../../components/password/ResetPassword";

export const RESET_PASSWORD_ROUTE = "/password/reset";

const LoginPage: NextPage = () => {
  return (
    <Layout title="Login">
      <Container maxW={"7xl"} centerContent py={"16"}>
        <ResetPassword />
      </Container>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  if (session) {
    return {
      redirect: {
        destination: USER_UPDATE_ROUTE,
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
export default LoginPage;
