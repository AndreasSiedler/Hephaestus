import { Avatar, Flex, Heading, Text } from "@chakra-ui/react";
import { Notification } from "../../../util/types";
import NextLink from "next/link";

interface NotificationListProps {
  notifications: Notification[];
}

const NotificationList: React.FC<NotificationListProps> = ({ notifications }) => {
  return (
    <Flex>
      {!!notifications.length ? (
        <Flex>
          {notifications.map((notification) => (
            <NextLink href={notification.type === "FRIENDSHIP_CREATE" ? "/friends" : ""}>
              <Flex alignItems={"center"}>
                <Avatar size={"sm"} src={notification.sender.image} />
                <Flex ml={2} flexDir={"column"}>
                  <Heading size={"sm"}>Friendship request</Heading>
                  <Text fontSize={"sm"} noOfLines={1}>
                    {notification.sender.name} sent you a new Friendship request
                  </Text>
                </Flex>
              </Flex>
            </NextLink>
          ))}
        </Flex>
      ) : (
        <Flex>No notificaitons available</Flex>
      )}
    </Flex>
  );
};

export default NotificationList;
