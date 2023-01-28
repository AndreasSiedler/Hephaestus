import {
  ChatIcon,
  ChevronDownIcon,
  CloseIcon,
  HamburgerIcon,
  SettingsIcon,
} from "@chakra-ui/icons";
import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Collapse,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  SkeletonText,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { BsGithub } from "react-icons/bs";

export default function Header() {
  const router = useRouter();
  const { isOpen, onToggle } = useDisclosure();
  const session = useSession();

  const onFriendsClick = () => {
    router.push("/friends");
  };

  return (
    <>
      <Flex color={useColorModeValue("gray.600", "white")} minH={"60px"} align={"center"}>
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color={useColorModeValue("gray.800", "white")}
          >
            Gitbud
          </Text>
        </Flex>
        {session.status === "unauthenticated" && (
          <Button onClick={() => signIn("github")} variant={"outline"}>
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
              <MenuList width={400}>
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
                <HStack px={5}>
                  <Button variant={"ghost"} w={"full"} onClick={onFriendsClick}>
                    Friends
                  </Button>
                  <Button variant={"ghost"} w={"full"} onClick={() => signOut()}>
                    Messages
                  </Button>
                  {/* <MenuItem onClick={() => signOut()}>Logout</MenuItem> */}
                </HStack>
              </MenuList>
            </Menu>
          </Flex>
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </>
  );
}

const MobileNav = () => {
  return (
    <Stack bg={useColorModeValue("white", "gray.800")} p={4} display={{ md: "none" }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text fontWeight={600} color={useColorModeValue("gray.600", "gray.200")}>
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Inspiration",
    children: [
      {
        label: "Explore Design Work",
        subLabel: "Trending Design to inspire you",
        href: "#",
      },
      {
        label: "New & Noteworthy",
        subLabel: "Up-and-coming Designers",
        href: "#",
      },
    ],
  },
  {
    label: "Find Work",
    children: [
      {
        label: "Job Board",
        subLabel: "Find your dream design job",
        href: "#",
      },
      {
        label: "Freelance Projects",
        subLabel: "An exclusive list for contract work",
        href: "#",
      },
    ],
  },
  {
    label: "Learn Design",
    href: "#",
  },
  {
    label: "Hire Designers",
    href: "#",
  },
];
