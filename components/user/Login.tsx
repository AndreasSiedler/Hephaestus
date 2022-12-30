import { useForm } from "react-hook-form";
import React, { ReactElement, useState } from "react";

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
  InputGroup,
  InputRightElement,
  IconButton,
  Center,
  Icon,
} from "@chakra-ui/react";
import { toastPosition } from "../../config/constants";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { BsGithub } from "react-icons/bs";
import { AxiosError } from "axios";
import { signIn, SignInResponse } from "next-auth/react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { FORGOT_PASSWORD_ROUTE } from "../../pages/password/forgot";

type IFormInput = {
  email: string;
  password: string;
};

/**
 * Renders a Login Form
 * @return {ReactElement}
 */
export default function Login(): ReactElement {
  // Hooks
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>();

  // Logic
  /**
   * Form submit
   * @param {IFormInput} values
   */
  async function onSubmit(values: IFormInput) {
    try {
      await signInWithEmailAndPassword(values);
    } catch (err) {
      const error = err as AxiosError;
      toast({
        title: "Failure",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: toastPosition,
      });
    }
  }
  /**
   * Signin with email and password function
   * @param {IFormInput} data
   * @return {Promise<CognitoUser>}
   */
  async function signInWithEmailAndPassword(data: IFormInput) {
    try {
      const { email, password } = data;
      const result = (await signIn("credentials", {
        redirect: false,
        email,
        password,
      })) as unknown as SignInResponse;

      if (result.error) {
        toast({
          title: "Failure",
          description: result.error,
          status: "error",
          duration: 9000,
          isClosable: true,
          position: toastPosition,
        });
      } else {
        // router.push(ROOMS_ROUTE);
      }
    } catch (error) {
      throw error;
    }
  }
  /**
   * Signin with github
   * @return {Promise<CognitoUser>}
   */
  async function signInWithGithub() {
    try {
      const resutlt = await signIn("github");
      console.log(resutlt);
    } catch (error) {
      throw error;
    }
  }

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} minW={["100%", 500]} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Link color={"blue.400"}>features</Link> ✌️
          </Text>
        </Stack>
        <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
          {/* Github social signin button */}
          <Button onClick={signInWithGithub} size={"xl"} w={"full"} mb={"4"} variant={"outline"}>
            <Icon as={BsGithub} mr={"2"} />
            Sign in with Github
          </Button>
          <Center>
            <Text>or</Text>
          </Center>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
              <FormControl isInvalid={Boolean(errors.password)} isRequired>
                <Flex justifyContent="space-between">
                  <FormLabel id="password" htmlFor="password">
                    Password
                  </FormLabel>
                  <Link as={NextLink} href={FORGOT_PASSWORD_ROUTE} color="blue.400">
                    Forgot Password?
                  </Link>
                </Flex>
                <InputGroup>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    {...register("password", {
                      required: "This is required",
                      minLength: {
                        value: 6,
                        message: "Minimum length should be 4",
                      },
                    })}
                  />
                  <InputRightElement>
                    <IconButton
                      variant="ghost"
                      onClick={() => setShowPassword((value) => !value)}
                      aria-label="Show password"
                      icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    />
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
              </FormControl>
              <Button mt={4} colorScheme="teal" size={"xl"} isLoading={isSubmitting} type="submit">
                Login
              </Button>
              <Center>
                <Text>
                  <Link color={"blue.400"}>Create an account.</Link>
                </Text>
              </Center>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
