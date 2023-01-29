import {
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import { NextPageContext } from "next";
import { getSession, useSession } from "next-auth/react";
import { useState } from "react";
import { FiCheckCircle } from "react-icons/fi";
import Header from "../components/layout/Header";
import Layout from "../components/layout/Layout";

const steps = [{ label: "Step 1" }, { label: "Step 2" }, { label: "Step 3" }];

export default function Sprucer() {
  const session = useSession();
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });
  const [name, setName] = useState("");

  if (!session.data?.user) return;

  const {
    data: {
      user: { name: userName },
    },
  } = session && session;

  const handleInputChange = (e: any) => setName(e.target.value);
  const isError = name === "";

  return (
    <Layout title="Bittstorm - Schaffe Platz für Neues">
      <Container maxW={"container.lg"} px={10} py={5}>
        <Header />
        <Heading maxW="md" as={"h1"} textAlign="center" margin={"auto"}>
          Hi {session.data?.user.name}! 👋 You are almost done..
        </Heading>
        <Steps checkIcon={FiCheckCircle} activeStep={activeStep} w={500} m={"auto"}>
          {steps.map(({ label }, index) => (
            <Step label={label} key={label}>
              <FormControl isInvalid={isError}>
                <FormLabel>Email</FormLabel>
                <Input type="email" value={name} onChange={handleInputChange} />
                {!isError ? (
                  <FormHelperText>
                    Enter the email you'd like to receive the newsletter on.
                  </FormHelperText>
                ) : (
                  <FormErrorMessage>Email is required.</FormErrorMessage>
                )}
              </FormControl>
            </Step>
          ))}
        </Steps>

        <Flex flexDir="column" mt="20">
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
