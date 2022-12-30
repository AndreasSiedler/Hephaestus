import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import Layout from "../components/layout/Layout";
import { Container } from "@chakra-ui/react";
import Register from "../components/user/Register";
import { getSession } from "next-auth/react";
import { USER_UPDATE_ROUTE } from "./user/update";

export const REGISTER_ROUTE = "/register";

const RegisterPage: NextPage = () => {
  return (
    <Layout title="Login">
      <Container maxW={"7xl"} centerContent py={"16"}>
        <Register />
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

export default RegisterPage;
