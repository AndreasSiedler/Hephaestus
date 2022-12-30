import { useForm } from "react-hook-form";
import React, { useEffect, useRef, useState } from "react";
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
  Avatar,
  HStack,
} from "@chakra-ui/react";
import { toastPosition } from "../../config/constants";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { registerUser } from "../../store/user";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import isEmpty from "lodash/isEmpty";
import { RegisterUserRequestBody } from "../../types";

export type IRegisterInput = {
  name: string;
  email: string;
  password: string;
  avatar: FileList;
};

/**
 * Renders a Signup form
 * @return {ReactElement}
 */
export default function Register() {
  // Hooks
  const toast = useToast();
  const dispatch = useAppDispatch();
  const { error, status } = useAppSelector((state) => state.user);
  const [showPassword, setShowPassword] = useState(false);
  const [avatar, setAvatar] = useState<string | ArrayBuffer | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | ArrayBuffer | null>(null);

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<IRegisterInput>();

  // Others
  const password = useRef({});
  password.current = watch("password", "");
  const avatarInput = watch("avatar");

  useEffect(() => {
    if (!error) return;
    toast({
      title: "Failure",
      description: error,
      status: "error",
      duration: 9000,
      isClosable: true,
      position: toastPosition,
    });
  }, [error]);

  useEffect(() => {
    if (!isEmpty(avatarInput)) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatar(reader.result);
          setAvatarPreview(reader.result);
        }
      };
      reader.readAsDataURL(avatarInput[0]);
    }
  }, [avatarInput]);

  /**
   * Signup with email and password function
   * @param {IRegisterInput} data
   * @return {void<CognitoUser>}
   */
  async function signUpWithEmailAndPassword(data: IRegisterInput): Promise<void> {
    const registerUserData: RegisterUserRequestBody = {
      name: data.name,
      email: data.email,
      password: data.password,
      avatar: avatar as string,
    };
    await dispatch(registerUser(registerUserData));
  }

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"}>
      <Stack maxW={"xl"} spacing={8} mx={"auto"} minW={["100%", 500]} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Signup your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Link color={"blue.400"}>features</Link> ✌️
          </Text>
        </Stack>
        <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
          <form onSubmit={handleSubmit(signUpWithEmailAndPassword)} noValidate>
            <Stack spacing={4}>
              <FormControl isInvalid={Boolean(errors.name)} isRequired>
                <FormLabel id="name" htmlFor="name">
                  Full name
                </FormLabel>
                <Input
                  id="name"
                  type={"text"}
                  placeholder="Name"
                  {...register("name", {
                    required: "This is required",
                    minLength: {
                      value: 6,
                      message: "Minimum length should be 6",
                    },
                  })}
                />
                <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
              </FormControl>

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
                <FormLabel id="password" htmlFor="password">
                  Password
                </FormLabel>
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
              {JSON.stringify(avatar)}

              <FormControl isInvalid={Boolean(errors.avatar)} isRequired>
                <FormLabel id="avatar" htmlFor="avatar">
                  Avatar
                </FormLabel>
                <HStack>
                  <Avatar src={avatarPreview ? (avatarPreview as string) : undefined} />
                  <Input
                    p={"1"}
                    id="avatar"
                    type="file"
                    placeholder="Avatar"
                    {...register("avatar", {
                      required: "This is required",
                    })}
                  />
                </HStack>

                <FormErrorMessage>{errors.avatar && errors.avatar.message}</FormErrorMessage>
              </FormControl>
              <Button
                mt={4}
                colorScheme="teal"
                size={"xl"}
                isLoading={status === "loading"}
                type="submit"
              >
                Signup
              </Button>
              <Center>
                {/* <Link color="blue.400">
                  <NextLink href={"/confirm"}>Confirm Password</NextLink>
                </Link> */}
                <Text textAlign={"center"} fontSize={"xs"}>
                  This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of
                  Service apply. By clicking &quot;Create account&quot;, I agree to Figma&apos;s TOS
                  and Privacy Policy.
                </Text>
              </Center>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
