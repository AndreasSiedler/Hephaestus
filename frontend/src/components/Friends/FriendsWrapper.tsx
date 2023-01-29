import { useMutation, useQuery } from "@apollo/client";
import { Box, Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import FriendshipOperations from "../../graphql/operations/friendships";
import {
  AcceptFriendshipData,
  AcceptFriendshipVariables,
  CancelFriendshipData,
  CancelFriendshipVariables,
  FriedshipsData,
  Session,
  WaitingFriendshipsData,
} from "../../util/types";
import SkeletonLoader from "../common/SkeletonLoader";
import FriendList from "./FriendList";

interface FriendsWrapperProps {
  session: Session;
}

const FriendsWrapper: React.FC<FriendsWrapperProps> = ({ session }) => {
  const {
    data: waitingFriendships,
    loading: waitingFriendshipsLoading,
    refetch: refetchWaitingFriendships,
  } = useQuery<WaitingFriendshipsData>(FriendshipOperations.Queries.waitingFriendships);

  const {
    data: friendships,
    loading: friendshipsLoading,
    refetch: refetchFriendships,
  } = useQuery<FriedshipsData>(FriendshipOperations.Queries.friendships);

  const [acceptFriendship, { error: acceptFriendshipError }] = useMutation<
    AcceptFriendshipData,
    AcceptFriendshipVariables
  >(FriendshipOperations.Mutations.acceptFriendship);
  const [cancelFriendship, { loading: cancelFriendshipLoading, error: cancelFriendshipError }] =
    useMutation<CancelFriendshipData, CancelFriendshipVariables>(
      FriendshipOperations.Mutations.cancelFriendship
    );

  const onAcceptFriendship = async (friendshipId: string) => {
    await acceptFriendship({
      variables: {
        friendshipId,
      },
    });
    refetchFriendships();
    refetchWaitingFriendships();
  };

  const onCancelFriendship = async (friendshipId: string) => {
    console.log(friendshipId);
    try {
      const { data } = await cancelFriendship({
        variables: {
          friendshipId,
        },
      });
      if (data?.cancelFriendship.error) {
        return toast.error("Ups, something went wrong. Please try it again.");
      }
    } catch (error) {
      toast.error("Ups, something went wrong. Please try it again.");
    }

    refetchFriendships();
    refetchWaitingFriendships();
  };

  useEffect(() => {
    if (!!cancelFriendshipError) {
      toast.error("Ups, something went wrong. Please try it again.");
    }
    if (!!acceptFriendshipError) {
      toast.error("Ups, something went wrong. Please try it again.");
    }
  }, [cancelFriendshipError, acceptFriendshipError]);

  return (
    <Box mt={10}>
      {waitingFriendshipsLoading ? (
        <SkeletonLoader count={3} height={20} width={"full"} spacing={5} />
      ) : (
        <Box mt={10}>
          <FriendList
            session={session}
            friends={waitingFriendships?.waitingFriendships ?? []}
            loading={waitingFriendshipsLoading}
            cancelFriendshipLoading={cancelFriendshipLoading}
            onAcceptFriendship={onAcceptFriendship}
            onCancelFriendship={onCancelFriendship}
          />
          <Heading size={"lg"} as={"h2"}>
            Waiting friends ({waitingFriendships?.waitingFriendships.length})
          </Heading>
        </Box>
      )}

      {friendshipsLoading ? (
        <SkeletonLoader count={3} height={20} width={"full"} spacing={5} />
      ) : (
        <Box mt={10}>
          <Heading size={"lg"} as={"h2"} mt={10}>
            My friends ({friendships?.friendships.length})
          </Heading>{" "}
          <FriendList
            session={session}
            friends={friendships?.friendships ?? []}
            loading={friendshipsLoading}
            cancelFriendshipLoading={cancelFriendshipLoading}
            onAcceptFriendship={onAcceptFriendship}
            onCancelFriendship={onCancelFriendship}
          />
        </Box>
      )}
    </Box>
  );
};

export default FriendsWrapper;
