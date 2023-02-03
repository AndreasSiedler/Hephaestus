import { useMutation, useQuery } from "@apollo/client";
import { Button, Center, Flex, HStack, Text } from "@chakra-ui/react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import UserOperations from "../../graphql/operations/users";
import { PopulatedUserData, UpdateUserData } from "../../util/types";
import SkeletonLoader from "../common/SkeletonLoader";
import OnboardingSteps from "./OnboardingSteps";

const steps = [{ label: "Step 1" }, { label: "Step 2" }, { label: "Step 3" }];

interface Generals {
  name?: string;
  email?: string;
  bio?: string;
  location?: string;
}

const Onboarding: React.FC = () => {
  const { nextStep, prevStep, setStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });

  const { data, loading, error } = useQuery<PopulatedUserData>(
    UserOperations.Queries.populatedUser
  );
  const [updateUser, { loading: updateUserLoading }] = useMutation<UpdateUserData>(
    UserOperations.Mutations.updateUser
  );

  const [expertise, setExpertise] = useState<string | undefined>(undefined);
  const [skills, setSkills] = useState<string[] | undefined>(undefined);
  const [generals, setGenerals] = useState<Generals | undefined>(undefined);

  useEffect(() => {
    if (activeStep === steps.length) {
      onSubmit();
    }
  }, [activeStep]);

  const onSubmit = async () => {
    if (!generals) return;

    const { name, email, bio, location } = generals;
    const extendedSkills = skills?.map((skill) => ({ name: skill, weight: 0 }));

    try {
      await updateUser({
        variables: {
          name,
          expertise,
          email,
          bio,
          location,
          skills: extendedSkills,
        },
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  const onExpertiseChange = (value: string) => {
    setExpertise(value);
  };

  const onSkillsChange = (values: string[]) => {
    console.log(values);
    setSkills(values);
  };

  const onGeneralsChange = (values: any) => {
    setGenerals(values);
  };

  return (
    <>
      {loading && (
        <Flex flexDir={"column"} mt={100}>
          <SkeletonLoader count={3} height={20} width={"full"} spacing={5} />
        </Flex>
      )}
      {error && (
        <Flex flexDir={"column"} mt={200} alignItems={"center"}>
          <Text textAlign={"center"} maxW={"xl"}>
            Ups, something went wrong. Please try it again or write me a message.
          </Text>
          <HStack justify={"center"} mt={5}>
            <NextLink href={"/chat?participants=andreassiedler"}>
              <Button size={"xl"}>Message</Button>
            </NextLink>
            <Button size={"xl"} colorScheme={"brand"}>
              Reload
            </Button>
          </HStack>
        </Flex>
      )}
      {data && (
        <>
          <Center mt={10} mb={20}>
            <Steps activeStep={activeStep} maxWidth={400} colorScheme="brand">
              <Step key={"expertise"} />
              <Step key={"languages"} />
              <Step key={"general"} />
            </Steps>
          </Center>
          <OnboardingSteps
            activeStep={activeStep}
            populatedUser={data.populatedUser}
            expertise={expertise}
            skills={skills}
            generals={generals}
            onExpertiseChange={onExpertiseChange}
            onSkillsChange={onSkillsChange}
            onGeneralsChange={onGeneralsChange}
          />
          {activeStep === steps.length ? (
            <Flex p={4}>
              <Button mx="auto" size="sm" onClick={reset}>
                Reset
              </Button>
            </Flex>
          ) : (
            <Flex width="100%" justify="flex-end">
              <Button
                isDisabled={activeStep === 0}
                mr={4}
                onClick={prevStep}
                size="sm"
                variant="ghost"
              >
                Prev
              </Button>
              <Button isLoading={updateUserLoading} onClick={nextStep} colorScheme="brand">
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Flex>
          )}
        </>
      )}
    </>
  );
};
export default Onboarding;
