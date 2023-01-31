import { Heading, Icon, Wrap, WrapItem } from "@chakra-ui/react";
import { FaAngular, FaHtml5, FaReact, FaVuejs } from "react-icons/fa";
import { SiNextdotjs } from "react-icons/si";

const SKILLS_FRONTEND = [
  { value: "html5", label: "HTML5", icon: FaHtml5 },
  { value: "react", label: "React", icon: FaReact },
  { value: "nextjs", label: "NextJS", icon: SiNextdotjs },
  { value: "vue", label: "Vue", icon: FaVuejs },
  { value: "angular", label: "Angular", icon: FaAngular },
];

interface SkillsProps {
  skills: string[];
  onChange: (value: string[]) => void;
}

const Skills: React.FC<SkillsProps> = ({ skills, onChange }) => {
  const onSkillClick = (value: string) => {
    const isAlreadySelected = !!skills.find((item) => item === value);

    if (isAlreadySelected) {
      const values = skills.filter((item) => item !== value);
      return onChange(values);
    }

    onChange([...skills, value]);
  };
  [];

  return (
    <Wrap m={"auto"} justify={"center"}>
      {SKILLS_FRONTEND.map((skill) => {
        const isSelected = !!skills.find((item) => item === skill.value);

        return (
          <WrapItem
            key={skill.value}
            w={200}
            p={5}
            justifyContent={"center"}
            alignItems={"center"}
            bg={"gray.900"}
            borderRadius={10}
            borderWidth={5}
            borderColor={isSelected ? "brand.500" : "gray.600"}
            _hover={{
              cursor: "pointer",
              bg: "gray.800",
            }}
            onClick={() => onSkillClick(skill.value)}
          >
            <Icon as={skill.icon} fontSize={40} />
            <Heading ml={2} size={"md"}>
              {skill.label}
            </Heading>
          </WrapItem>
        );
      })}
    </Wrap>
  );
};

export default Skills;
