import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import Layout from "../components/layout/Layout";
import { Container } from "@chakra-ui/react";
import Login from "../components/user/Login";
import { getSession } from "next-auth/react";

export const LOGIN_ROUTE = "/login";

const LoginPage: NextPage = () => {
  return (
    <Layout title="Login">
      <Container maxW={"7xl"} centerContent py={"16"}>
        <Login />
      </Container>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
export default LoginPage;
