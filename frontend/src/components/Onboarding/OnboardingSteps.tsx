import { Box, Container, Heading } from "@chakra-ui/react";
import { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { IOnboardingFormInput } from ".";
import { PopulatedUser } from "../../util/types";
import ExpertiseLevel from "../common/ExpertiseLevel";
import Skills from "../common/Skills";
import UpdateUser from "../common/UpdateUser";

interface OnboardingStepsProps {
  activeStep: number;
  populatedUser: PopulatedUser;
  onSubmit: (values: IOnboardingFormInput) => Promise<void>;
}

const OnboardingSteps: React.FC<OnboardingStepsProps> = ({
  activeStep,
  populatedUser,
  onSubmit,
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

  const methods = useForm<IOnboardingFormInput>({
    defaultValues: useMemo(() => {
      return {
        expertise: populatedUser.expertise,
        bio: bio,
        email: email,
        location: location,
        name: name,
      };
    }, []),
  });
  const { watch, setValue, handleSubmit, register } = methods;

  const { expertise, skills } = watch();

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {activeStep === 0 && (
          <Box>
            <Heading maxW="md" as={"h1"} textAlign="center" margin={"auto"} mb={10}>
              Hi {name ?? username}! 👋 What is your level of expertise?
            </Heading>
            <ExpertiseLevel
              expertise={expertise ?? existingExpertise ?? "trainee"}
              onChange={(value) => setValue("expertise", value)}
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
              onChange={(values) => setValue("skills", values)}
            />
          </Box>
        )}

        {activeStep === 2 && (
          <Container maxW={"container.md"}>
            <UpdateUser />
          </Container>
        )}
      </form>
    </FormProvider>
  );
};
export default OnboardingSteps;
