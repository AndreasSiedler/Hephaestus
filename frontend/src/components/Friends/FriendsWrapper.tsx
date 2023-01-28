import { useQuery } from "@apollo/client";
import { Box, Heading } from "@chakra-ui/react";
import FriendshipOperations from "../../graphql/operations/friendships";
import { WaitingFriendshipsData } from "../../util/types";
import SkeletonLoader from "../common/SkeletonLoader";
import FriendList from "./FriendList";

const FriendsWrapper: React.FC = () => {
  const { data: waitingFriendships, loading: waitingFriendshipsLoading } =
    useQuery<WaitingFriendshipsData>(FriendshipOperations.Queries.waitingFriendships);

  return (
    <Box mt={10}>
      <Heading size={"lg"} as={"h2"}>
        Waiting
      </Heading>
      <Box mt={10}>
        {waitingFriendshipsLoading ? (
          <SkeletonLoader count={3} height={20} width={"full"} spacing={5} />
        ) : (
          <FriendList friends={waitingFriendships?.waitingFriendships ?? []} />
        )}
      </Box>
    </Box>
  );
};

export default FriendsWrapper;
