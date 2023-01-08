import { Button, Center, Container, Flex, Heading } from "@chakra-ui/react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import { NextPageContext } from "next";
import { getSession, useSession } from "next-auth/react";
import { FiCheckCircle } from "react-icons/fi";
import Header from "../components/layout/Header";
import Layout from "../components/layout/Layout";

const steps = [{ label: "Step 1" }, { label: "Step 2" }, { label: "Step 3" }];

export default function Sprucer() {
  const session = useSession();
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });

  return (
    <Layout title="Bittstorm - Schaffe Platz für Neues">
      <Container maxW={"container.lg"} px={10} py={5}>
        <Header />
        <Center flexDir="column" mt="16">
          <Heading maxW="md" as={"h1"} textAlign="center">
            Hi {session.data?.user.name}! 👋 You are almost done..
          </Heading>
        </Center>
        <Flex flexDir="column" mt="20">
          <Steps checkIcon={FiCheckCircle} activeStep={activeStep}>
            {steps.map(({ label }, index) => (
              <Step label={label} key={label}>
                Inhalt
              </Step>
            ))}
          </Steps>
          {activeStep === steps.length ? (
            <Flex px={4} py={4} flexDirection="column">
              <Heading fontSize="xl" textAlign="center">
                Woohoo! All steps completed!
              </Heading>
              <Button mx="auto" mt={6} size="sm" onClick={reset}>
                Reset
              </Button>
            </Flex>
          ) : (
            <Flex justify="flex-end">
              <Button
                isDisabled={activeStep === 0}
                mr={4}
                onClick={prevStep}
                size="sm"
                variant="ghost"
              >
                Prev
              </Button>
              <Button size="sm" onClick={nextStep}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Flex>
          )}
        </Flex>
      </Container>
    </Layout>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
