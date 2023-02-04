import { Button, Container, Flex, FormControl, FormErrorMessage, Heading } from "@chakra-ui/react";
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
  isLoading: boolean;
  onSubmit: (values: IOnboardingFormInput) => Promise<void>;
  onNextStep: () => void;
  onPrevStep: () => void;
}

const OnboardingSteps: React.FC<OnboardingStepsProps> = ({
  activeStep,
  populatedUser,
  isLoading,
  onSubmit,
  onPrevStep,
}) => {
  const { expertise: existingExpertise, skills: existingSkills = [] } = populatedUser;

  const methods = useForm<IOnboardingFormInput>({
    defaultValues: useMemo(() => {
      return {
        expertise: populatedUser.expertise,
        name: populatedUser.name,
        bio: populatedUser.bio,
        email: populatedUser.email,
        location: populatedUser.location,
        skills: populatedUser.skills?.map((skill) => skill.name),
      };
    }, []),
  });

  const {
    watch,
    setValue,
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  register("expertise", {
    required: "Expertise is required",
  });

  const { skills } = watch();

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {activeStep === 0 && (
          <FormControl isInvalid={!!errors.expertise}>
            <Heading maxW="md" as={"h1"} textAlign="center" margin={"auto"} mb={10}>
              Hi {populatedUser.name ?? populatedUser.username}! 👋 What is your level of expertise?
            </Heading>
            <ExpertiseLevel />
            <FormErrorMessage justifyContent={"center"}>
              {errors.expertise && errors.expertise.message}
            </FormErrorMessage>
          </FormControl>
        )}

        {activeStep === 1 && (
          <FormControl isInvalid={!!errors.skills}>
            <Heading maxW="md" as={"h1"} textAlign="center" margin={"auto"} mb={10}>
              What languages do you use? 👨‍💻
            </Heading>
            <Skills
              skills={skills ?? existingSkills.map((skill) => skill.name) ?? []}
              onChange={(values) => setValue("skills", values)}
            />
            <FormErrorMessage>{errors.skills && errors.skills.message}</FormErrorMessage>
          </FormControl>
        )}

        {activeStep === 2 && (
          <Container maxW={"container.md"}>
            <UpdateUser />
          </Container>
        )}
        <Flex width="100%" justify="flex-end">
          <Button
            isDisabled={activeStep === 0}
            mr={4}
            onClick={onPrevStep}
            size="sm"
            variant="ghost"
          >
            Prev
          </Button>
          <Button colorScheme="brand" type="submit" isLoading={isLoading}>
            {activeStep < 2 ? "Next" : "Finish"}
          </Button>
        </Flex>
      </form>
    </FormProvider>
  );
};
export default OnboardingSteps;
