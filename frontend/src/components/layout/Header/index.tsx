import { SettingsIcon } from "@chakra-ui/icons";
import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuList,
  SimpleGrid,
  SkeletonText,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { BsGithub } from "react-icons/bs";

export default function Header() {
  const router = useRouter();
  const session = useSession();
  const [pageLoading, setLoading] = useState(false);

  const onFriendsClick = () => {
    router.push("/friends");
  };

  const onSignin = async () => {
    try {
      setLoading(true);
      await signIn("github").then(() => console.log("done"));
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Flex
      color={useColorModeValue("gray.600", "white")}
      minH={"60px"}
      align={"center"}
      justifyContent={"space-between"}
    >
      <NextLink href={"/"}>
        <Text
          textAlign={useBreakpointValue({ base: "center", md: "left" })}
          fontFamily={"heading"}
          color={useColorModeValue("gray.800", "white")}
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
      {session.status === "authenticated" && (
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton as={Button} rounded={"full"} variant={"link"} cursor={"pointer"} minW={0}>
              <Avatar size={"sm"} src={session.data?.user?.image ?? undefined}>
                <AvatarBadge bg="#B73CF1" boxSize={6}>
                  <Text fontWeight={"bold"}>6</Text>
                </AvatarBadge>
              </Avatar>
            </MenuButton>
            <MenuList width={400} bg="gray.900" border="1px solid #B73CF1">
              <Flex px={5} justifyContent={"space-between"} alignItems={"center"}>
                <Heading size={"sm"}>Notifications</Heading>
                <IconButton icon={<SettingsIcon />} aria-label={"Settings"} />
              </Flex>
              <Box px={5} mt={5}>
                <SkeletonText
                  startColor="gray.500"
                  pb="8"
                  noOfLines={3}
                  spacing="4"
                  skeletonHeight="2"
                />
                <SkeletonText
                  startColor="gray.500"
                  pb="4"
                  noOfLines={3}
                  spacing="4"
                  skeletonHeight="2"
                />
              </Box>
              <MenuDivider />
              <SimpleGrid px={5} columns={2} spacing={3}>
                <Button variant={"ghost"} w={"full"} onClick={onFriendsClick}>
                  Friends
                </Button>
                <Button variant={"ghost"} w={"full"}>
                  Messages
                </Button>
                <Button variant={"ghost"} w={"full"} onClick={() => signOut()}>
                  Logout
                </Button>
              </SimpleGrid>
            </MenuList>
          </Menu>
        </Flex>
      )}
    </Flex>
  );
}
