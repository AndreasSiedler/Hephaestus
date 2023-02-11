import { Button, Flex, Icon, Text } from "@chakra-ui/react";
import { signIn, useSession } from "next-auth/react";
import NextLink from "next/link";
import { useState } from "react";
import { BsGithub } from "react-icons/bs";
import UserMenuButton from "./UserMenuButton";

export default function Header() {
  const session = useSession();
  const [pageLoading, setLoading] = useState(false);

  /**
   * Handler functions
   */
  const onSignin = async () => {
    try {
      setLoading(true);
      await signIn("github").then(() => console.log("done"));
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Flex color={"white"} minH={"60px"} align={"center"} justifyContent={"space-between"}>
      <NextLink href={"/"}>
        <Text
          textAlign={"left"}
          fontFamily={"heading"}
          color={"white"}
          fontSize={"lg"}
          fontWeight={"extrabold"}
        >
          Gitbud
        </Text>
      </NextLink>
      {session.status === "unauthenticated" && (
        <Button isLoading={pageLoading} onClick={onSignin} variant={"outline"}>
          <Icon as={BsGithub} mr={"2"} />
          Sign in
        </Button>
      )}
      {session.status === "authenticated" && <UserMenuButton session={session} />}
    </Flex>
  );
}
