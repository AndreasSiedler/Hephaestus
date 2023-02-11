import { Box, Container, Divider, Flex, VStack } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Header from "../layout/Header";

const MENUS = [
  { id: "profile", label: "Profile" },
  { id: "account", label: "Account" },
];

type SettingsProps = {};

const Settings: React.FC<SettingsProps> = () => {
  const router = useRouter();

  const { query } = router;

  useEffect(() => {
    if (!query.menu) router.push("/settings?menu=profile");
  }, []);

  return (
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
          {/* {query.menu === "profile" && <UpdateUser />} */}
        </Flex>
      </Flex>
    </Container>
  );
};

export default Settings;
