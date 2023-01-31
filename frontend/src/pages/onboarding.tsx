import { useMutation } from "@apollo/client";
import { Box, Button, Center, Container, Flex, Heading } from "@chakra-ui/react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import { getSession, useSession } from "next-auth/react";
import { NextPageContext } from "next/types";
import { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import Layout from "../components/layout/Layout";
import ExpertiseLevel from "../components/User/UpdateUser/ExpertiseLevel";
import Skills from "../components/User/UpdateUser/Skills";
import UpdateUser from "../components/User/UpdateUser/UpdateUser";
import UserOperations from "../graphql/operations/users";
import { UpdateUserData } from "../util/types";

const steps = [{ label: "Step 1" }, { label: "Step 2" }, { label: "Step 3" }];

const ProfilePage: React.FC = () => {
  const { nextStep, prevStep, setStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });
  const session = useSession();
  console.log(session);
  const [expertise, setExpertise] = useState("trainee");
  const [skills, setSkills] = useState<string[]>([]);
  const [generals, setGenerals] = useState<{
    name?: string;
    email?: string;
    bio?: string;
    location?: string;
  }>({ ...session.data?.user });

  const [updateUser, { loading: updateUserLoading }] = useMutation<UpdateUserData>(
    UserOperations.Mutations.updateUser
  );

  useEffect(() => {
    if (activeStep === steps.length) {
      onSubmit();
    }
  }, [activeStep]);

  const onSubmit = async () => {
    console.log(expertise, skills, generals);
    const extendedSkills = skills.map((skill) => ({ name: skill, weight: 0 }));
    try {
      await updateUser({
        variables: {
          name: generals.name,
          email: generals.email,
          bio: generals.bio,
          location: generals.location,
          skills: extendedSkills,
        },
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <Layout title="Update your profile">
      <Container maxW={"container.lg"} px={10} py={5}>
        <Header />
        <Center mt={10} mb={20}>
          <Steps activeStep={activeStep} maxWidth={400} colorScheme="brand">
            <Step key={"expertise"} />
            <Step key={"languages"} />
            <Step key={"general"} />
          </Steps>
        </Center>

        {activeStep === 0 && (
          <Box>
            <Heading maxW="md" as={"h1"} textAlign="center" margin={"auto"} mb={10}>
              Hi {session.data?.user.name ? session.data?.user.name : session.data?.user.username}!
              👋 What is your level of expertise?
            </Heading>
            <ExpertiseLevel expertise={expertise} onChange={(value) => setExpertise(value)} />
          </Box>
        )}

        {activeStep === 1 && (
          <Box>
            <Heading maxW="md" as={"h1"} textAlign="center" margin={"auto"} mb={10}>
              What languages do you use? 👨‍💻
            </Heading>
            <Skills skills={skills} onChange={(values) => setSkills(values)} />
          </Box>
        )}

        {activeStep === 2 && (
          <Container maxW={"container.md"}>
            <UpdateUser data={generals} onChange={(values) => setGenerals(values)} />
          </Container>
        )}

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
      </Container>
    </Layout>
  );
};

export default ProfilePage;

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
