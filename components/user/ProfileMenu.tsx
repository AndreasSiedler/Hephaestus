import React from "react";
import {
  Avatar,
  Box,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useColorModeValue,
  CircularProgress,
} from "@chakra-ui/react";
import { FiChevronDown } from "react-icons/fi";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useAppSelector } from "../../store/hooks";
import { UserState } from "../../store/user";
import NextLink from "next/link";
import { USER_UPDATE_ROUTE } from "../../pages/user/update";
import isEmpty from "lodash/isEmpty";
import { USER_BOOKINGS_ROUTE } from "../../pages/user/bookings";
import { ADMIN_ROOMS_ROUTE } from "../../pages/admin/rooms";
import { ADMIN_BOOKINGS_ROUTE } from "../../pages/admin/bookings";

export type ProfileMenuProps = {};

const ProfileMenu = (props: ProfileMenuProps) => {
  const router = useRouter();
  const { user }: UserState = useAppSelector((state) => state.user);

  /**
   * Logout user
   */
  async function logoutHandler() {
    try {
      await signOut();
      router.push("/");
    } catch (error) {
      console.log("Could not log out");
    }
  }

  if (!isEmpty(user)) {
    return (
      <Menu>
        <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: "none" }}>
          <HStack>
            <Avatar size={"sm"} src={user.avatar.url ?? ""} />
            <Box display={{ base: "none", md: "flex" }}>
              <FiChevronDown />
            </Box>
          </HStack>
        </MenuButton>
        <MenuList
          bg={useColorModeValue("white", "gray.900")}
          borderColor={useColorModeValue("gray.200", "gray.700")}
        >
          {user.role === "admin" && (
            <>
              <NextLink href={ADMIN_BOOKINGS_ROUTE}>
                <MenuItem>Bookings</MenuItem>
              </NextLink>
              <NextLink href={ADMIN_ROOMS_ROUTE}>
                <MenuItem>Rooms</MenuItem>
              </NextLink>
            </>
          )}
          <MenuDivider />
          <NextLink href={USER_UPDATE_ROUTE}>
            <MenuItem>Profile</MenuItem>
          </NextLink>
          <NextLink href={USER_BOOKINGS_ROUTE}>
            <MenuItem>My Bookings</MenuItem>
          </NextLink>
          <MenuItem color={"red.400"} onClick={logoutHandler}>
            Sign out
          </MenuItem>
        </MenuList>
      </Menu>
    );
  }

  return <CircularProgress size={"7"} isIndeterminate />;
};
export default ProfileMenu;
