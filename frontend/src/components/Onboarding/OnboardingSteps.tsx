import { Box, Container, Heading } from "@chakra-ui/react";
import { PopulatedUser } from "../../util/types";

import ExpertiseLevel from "../common/ExpertiseLevel";
import Skills from "../common/Skills";
import UpdateUser from "../common/UpdateUser";

interface OnboardingStepsProps {
  activeStep: number;
  populatedUser: PopulatedUser;
  expertise?: string;
  skills?: string[];
  generals?: any;
  onExpertiseChange: (value: string) => void;
  onSkillsChange: (values: string[]) => void;
  onGeneralsChange: (values: {}) => void;
}

const OnboardingSteps: React.FC<OnboardingStepsProps> = ({
  activeStep,
  populatedUser,
  expertise,
  skills,
  generals,
  onExpertiseChange,
  onSkillsChange,
  onGeneralsChange,
}) => {
  const {
    name,
    email,
    username,
    bio,
    location,
    expertise: existingExpertise,
    skills: existingSkills = [],
  } = populatedUser;

  return (
    <>
      {activeStep === 0 && (
        <Box>
          <Heading maxW="md" as={"h1"} textAlign="center" margin={"auto"} mb={10}>
            Hi {name ?? username}! 👋 What is your level of expertise?
          </Heading>
          <ExpertiseLevel
            expertise={expertise ?? existingExpertise ?? "trainee"}
            onChange={(value) => onExpertiseChange(value)}
          />
        </Box>
      )}

      {activeStep === 1 && (
        <Box>
          <Heading maxW="md" as={"h1"} textAlign="center" margin={"auto"} mb={10}>
            What languages do you use? 👨‍💻
          </Heading>
          <Skills
            skills={skills ?? existingSkills.map((skill) => skill.name) ?? []}
            onChange={(values) => onSkillsChange(values)}
          />
        </Box>
      )}

      {activeStep === 2 && (
        <Container maxW={"container.md"}>
          <UpdateUser
            data={generals ?? { bio, email, location, name }}
            onChange={(values) => onGeneralsChange(values)}
          />
        </Container>
      )}
    </>
  );
};
export default OnboardingSteps;
