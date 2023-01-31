import { Box, Container, Divider, Flex, VStack } from "@chakra-ui/react";
import { getSession, useSession } from "next-auth/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { NextPageContext } from "next/types";
import { useEffect } from "react";
import Header from "../components/layout/Header";
import Layout from "../components/layout/Layout";
import UpdateUser from "../components/User/UpdateUser/UpdateUser";

const MENUS = [
  { id: "profile", label: "Profile" },
  { id: "account", label: "Account" },
];

const SettingsPage: React.FC = () => {
  const session = useSession();
  const router = useRouter();

  const { query } = router;

  useEffect(() => {
    if (!query.menu) router.push("/settings?menu=profile");
  }, []);

  return (
    <Layout title="User settings">
      <Container maxW={"container.lg"} px={10} py={5}>
        <Header />
        <Flex>
          <VStack w={300} divider={<Divider />}>
            {MENUS.map((menu) => (
              <NextLink href={`/settings?menu=${menu.id}`}>
                <Box
                  key={menu.id}
                  p={5}
                  borderRadius={"lg"}
                  bg={query.menu === menu.id ? "gray.900" : "black"}
                  _hover={{
                    bg: "gray.800",
                    cursor: "pointer",
                  }}
                >
                  {menu.label}
                </Box>
              </NextLink>
            ))}
          </VStack>
          <Flex flexGrow={"1"} flexDir={"column"} px={10}>
            {query.menu === "profile" && <UpdateUser user={session.data?.user} />}
          </Flex>
        </Flex>
      </Container>
    </Layout>
  );
};

export default SettingsPage;

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
