import { Box, Flex, Heading } from "@chakra-ui/react";
import { useState } from "react";

interface ExpertiseLevelProps {
  expertise: string;
  onChange: (value: string) => void;
}

const ExpertiseLevel: React.FC<ExpertiseLevelProps> = ({ expertise, onChange }) => {
  const [hoveredLevel, setHoveredLevel] = useState("");

  const onLevelClick = (value: string) => {
    onChange(value);
  };

  const onMouseEnter = (value: string) => {
    setHoveredLevel(value);
  };

  const onMouseLeave = (value: string) => {
    setHoveredLevel("");
  };

  return (
    <Flex flexDir={"column"} alignItems="center">
      <Flex h={200} alignItems={"flex-end"} justifyContent={"center"}>
        <ExpertisLevelBox
          value="trainee"
          height="55%"
          selected={
            expertise === "trainee" ||
            expertise === "junior" ||
            expertise === "midlevel" ||
            expertise === "senior"
          }
          hovered={
            hoveredLevel === "trainee" ||
            hoveredLevel === "junior" ||
            hoveredLevel === "midlevel" ||
            hoveredLevel === "senior"
          }
          onClick={onLevelClick}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        />
        <ExpertisLevelBox
          value="junior"
          height="70%"
          selected={expertise === "junior" || expertise === "midlevel" || expertise === "senior"}
          hovered={
            hoveredLevel === "junior" || hoveredLevel === "midlevel" || hoveredLevel === "senior"
          }
          onClick={onLevelClick}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        />
        <ExpertisLevelBox
          value="midlevel"
          height="85%"
          selected={expertise === "midlevel" || expertise === "senior"}
          hovered={hoveredLevel === "midlevel" || hoveredLevel === "senior"}
          onClick={onLevelClick}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        />
        <ExpertisLevelBox
          value="senior"
          height="100%"
          selected={expertise === "senior"}
          hovered={hoveredLevel === "senior"}
          onClick={onLevelClick}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        />
      </Flex>
      <Heading mt={5}>{expertise}</Heading>
    </Flex>
  );
};

const ExpertisLevelBox = ({
  value,
  height,
  selected,
  hovered,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: {
  value: string;
  height: string;
  selected: boolean;
  hovered: boolean;
  onClick: (value: string) => void;
  onMouseEnter: (value: string) => void;
  onMouseLeave: (value: string) => void;
}) => (
  <Box
    bg={selected || hovered ? "brand.500" : "gray.800"}
    width={20}
    height={height}
    border={"10px solid black"}
    borderRadius={20}
    _hover={{
      bg: "brand.500",
      cursor: "pointer",
    }}
    onClick={() => onClick(value)}
    onMouseEnter={() => onMouseEnter(value)}
    onMouseLeave={() => onMouseLeave(value)}
  />
);

export default ExpertiseLevel;
