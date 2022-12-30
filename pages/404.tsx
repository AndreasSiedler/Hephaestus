import React from "react";
import type { NextPage } from "next";
import Layout from "../components/layout/Layout";
import { Container } from "@chakra-ui/react";
import NotFound from "../components/layout/NotFound";

export const NOT_FOUND_ROUTE = "/   not-found";

const LoginPage: NextPage = () => {
  return (
    <Layout title="Page Not Found">
      <Container minH="100vh" maxW={"7xl"} centerContent py={"16"}>
        <NotFound />
      </Container>
    </Layout>
  );
};

export default LoginPage;
