import { Box } from "@chakra-ui/react";
import React from "react";

type FeedProps = {};

export default function Feed({}: FeedProps) {
  return (
    <Box
      display={{
        base: "none",
        md: "block",
      }}
      width={"100%"}
    >
      Feed
    </Box>
  );
}
