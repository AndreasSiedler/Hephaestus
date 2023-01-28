import { useMutation, useQuery } from "@apollo/client";
import { Box, Heading } from "@chakra-ui/react";
import FriendshipOperations from "../../graphql/operations/friendships";
import {
  AcceptFriendshipData,
  AcceptFriendshipVariables,
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
  const { data: waitingFriendships, loading: waitingFriendshipsLoading } =
    useQuery<WaitingFriendshipsData>(FriendshipOperations.Queries.waitingFriendships);

  const { data: friendships, loading: friendshipsLoading } = useQuery<FriedshipsData>(
    FriendshipOperations.Queries.friendships
  );

  const [acceptFriendship] = useMutation<AcceptFriendshipData, AcceptFriendshipVariables>(
    FriendshipOperations.Mutations.acceptFriendship
  );

  const onAcceptFriendship = (friendshipId: string) => {
    acceptFriendship({
      variables: {
        friendshipId,
      },
    });
  };

  return (
    <Box mt={10}>
      <Heading size={"lg"} as={"h2"}>
        Waiting friends
      </Heading>
      <Box mt={10}>
        {waitingFriendshipsLoading ? (
          <SkeletonLoader count={3} height={20} width={"full"} spacing={5} />
        ) : (
          <FriendList
            session={session}
            friends={waitingFriendships?.waitingFriendships ?? []}
            loading={waitingFriendshipsLoading}
            onAcceptFriendship={onAcceptFriendship}
          />
        )}
      </Box>
      <Heading size={"lg"} as={"h2"} mt={10}>
        My friends
      </Heading>
      {waitingFriendshipsLoading ? (
        <SkeletonLoader count={3} height={20} width={"full"} spacing={5} />
      ) : (
        <FriendList
          session={session}
          friends={friendships?.friendships ?? []}
          loading={friendshipsLoading}
          onAcceptFriendship={onAcceptFriendship}
        />
      )}
    </Box>
  );
};

export default FriendsWrapper;
