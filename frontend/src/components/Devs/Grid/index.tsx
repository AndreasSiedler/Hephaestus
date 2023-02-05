import { Box, Skeleton, SkeletonCircle, SkeletonText, Grid } from "@chakra-ui/react";
import { Session } from "next-auth";
import React, { useState } from "react";

interface DevGridProps {
  session: Session;
}

const DevGrid: React.FC<DevGridProps> = ({ session }) => {
  const [activeGridView, setActiveGridView] = useState(false);

  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={6}>
      <ProfileCard />
      <ProfileCard />
      <ProfileCard />
      <ProfileCard />
      <ProfileCard />
    </Grid>
  );
};
export default DevGrid;

function ProfileCard() {
  return (
    <Box
      bg="gray.900"
      display={["none", "none", "block"]}
      width="100%"
      border={"1px solid"}
      borderColor={"brand.500"}
      px="6"
      py="10"
      borderRadius="md"
    >
      <SkeletonCircle startColor="gray.100" endColor="gray.600" size="14" mx="auto" />
      <SkeletonText startColor="gray.500" mt="4" noOfLines={3} spacing="4" skeletonHeight="2" />
      <Skeleton w="24" height="25px" mx="auto" mt="5" />
    </Box>
  );
}
