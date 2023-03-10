import { useQuery } from "@apollo/client";
import { ChatIcon, SettingsIcon } from "@chakra-ui/icons";
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
  MenuList,
  SimpleGrid,
  SkeletonText,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Session } from "next-auth";
import NextLink from "next/link";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { RxPerson } from "react-icons/rx";
import NotificationOperations from "../../../graphql/operations/notifications";
import { NotificationCreatedSubscriptionData, NotificationsData } from "../../../util/types";
import NotificationList from "./Notifications";

type UserMenuButtonProps = {
  session: { status: string; data: Session };
};

const UserMenuButton: React.FC<UserMenuButtonProps> = ({ session }) => {
  const chakraToast = useToast();

  /**
   * Queries
   */
  const {
    data: notifications,
    loading: notificationsLoading,
    error: notificationsError,
    subscribeToMore,
  } = useQuery<NotificationsData, null>(NotificationOperations.Query.notifications, {
    onError: ({ message }) => {
      toast.error(message);
    },
  });

  /**
   * Subscriptions
   */
  const subscribeToNewNotifications = () => {
    console.log("subscribeToNewNotifications");
    subscribeToMore({
      document: NotificationOperations.Subscriptions.notificationCreated,
      updateQuery: (prev, { subscriptionData }: NotificationCreatedSubscriptionData) => {
        if (!subscriptionData.data) return prev;

        const newNotification = subscriptionData.data.notificationCreated;
        chakraToast({
          title: "New friendship request.",
          position: "top-right",
          description: `You were sent you a friendship request`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });

        return Object.assign({}, prev, {
          notifications: [...prev.notifications, newNotification],
        });
      },
    });
  };

  /**
   * Execute subscriptions on mount
   */
  useEffect(() => {
    subscribeToNewNotifications();
  }, []);

  if (notificationsError) {
    toast.error("There was an error fetching notifications");
    return null;
  }

  return (
    <Flex alignItems={"center"}>
      <Menu>
        <MenuButton as={Button} rounded={"full"} variant={"link"} cursor={"pointer"} minW={0}>
          <Avatar size={"sm"} src={session.data.user.image ?? undefined}>
            {!!notifications?.notifications.length && <AvatarBadge bg="brand.500" boxSize={4} />}
          </Avatar>
        </MenuButton>
        <MenuList width={400} bg="gray.900" border="1px solid" borderColor={"brand.500"}>
          <Flex px={5} justifyContent={"space-between"} alignItems={"center"}>
            <Heading size={"sm"}>Notifications</Heading>
            <NextLink href={"/settings?menu=profile"} shallow>
              <IconButton icon={<SettingsIcon />} aria-label={"Settings"} />
            </NextLink>
          </Flex>
          <Box px={5} mt={5}>
            {notifications?.notifications && (
              <NotificationList notifications={notifications.notifications} />
            )}
            {notificationsLoading && (
              <>
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
              </>
            )}
          </Box>
          <SimpleGrid px={5} columns={2} spacing={3} my={10}>
            <NextLink href={"/chat"} shallow>
              <Button variant={"ghost"} w={"full"} h={20}>
                <VStack>
                  <ChatIcon />
                  <Box> Messages</Box>
                </VStack>
              </Button>
            </NextLink>
            <NextLink href={"/friends"} shallow>
              <Button variant={"ghost"} w={"full"} h={20}>
                <VStack>
                  <Icon as={RxPerson} fontSize={"xl"} />
                  <Box> Friends</Box>
                </VStack>
              </Button>
            </NextLink>
          </SimpleGrid>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default UserMenuButton;
