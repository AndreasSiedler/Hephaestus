import { useForm } from "react-hook-form";
import React, { ReactElement, useEffect } from "react";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Flex,
  Stack,
  useColorModeValue,
  Heading,
  Link,
  Box,
  Text,
  useToast,
} from "@chakra-ui/react";
import { toastPosition } from "../../config/constants";

type IFormInput = {
  email: string;
};

/**
 * Renders a forgot password form
 * @return {ReactElement}
 */
export default function ForgotPassword(): ReactElement {
  const toast = useToast();

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>();

  const email = watch("email");

  // Show toast notification
  useEffect(() => {
    switch (status) {
      case "success":
        toast({
          title: "Success.",
          description: `Email sent to: ${email}`,
          status: "success",
          duration: 9000,
          isClosable: true,
          position: toastPosition,
        });
        break;

      case "failed":
        toast({
          title: "Failure",
          description: "There was an error",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: toastPosition,
        });
        break;

      default:
        break;
    }
  }, [status]);

  /**
   * Submit handler
   * @param {IFormInput} values
   */
  async function submitHandler(values: IFormInput) {}

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} minW={["100%", 500]} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Forgot Password</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Link color={"blue.400"}>features</Link> ✌️
          </Text>
        </Stack>
        <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
          <form onSubmit={handleSubmit(submitHandler)} noValidate>
            <Stack spacing={4}>
              <FormControl isInvalid={Boolean(errors.email)} isRequired>
                <FormLabel id="email" htmlFor="email">
                  Email
                </FormLabel>
                <Input
                  id="email"
                  type="text"
                  placeholder="Email"
                  {...register("email", {
                    required: "This is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
              </FormControl>

              <Button
                mt={4}
                rounded={"none"}
                colorScheme="teal"
                size={"xl"}
                isLoading={isSubmitting}
                type="submit"
              >
                Send Email
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
