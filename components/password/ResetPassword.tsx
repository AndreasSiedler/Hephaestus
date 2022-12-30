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
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { resetPassword } from "../../store/password";
import { useRouter } from "next/router";
import { isString } from "lodash";
import { LOGIN_ROUTE } from "../../pages/login";

type IFormInput = {
  password: string;
  confirmPassword: string;
};

/**
 * Renders a reset password form
 * @return {ReactElement}
 */
export default function ResetPassword(): ReactElement {
  const toast = useToast();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { error, status } = useAppSelector((state) => state.passwordReset);
  const { token } = router.query;

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>();

  // Show toast notification
  useEffect(() => {
    switch (status) {
      case "success":
        toast({
          title: "Success.",
          description: "Password was reset successfully.",
          status: "success",
          duration: 9000,
          isClosable: true,
          position: toastPosition,
        });
        router.push(LOGIN_ROUTE);
        break;

      case "failed":
        toast({
          title: "Failure",
          description: error,
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
  async function submitHandler(values: IFormInput) {
    if (!isString(token)) return;
    await dispatch(resetPassword({ ...values, token }));
  }

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} minW={["100%", 500]} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Reset Password</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Link color={"blue.400"}>features</Link> ✌️
          </Text>
        </Stack>
        <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
          <form onSubmit={handleSubmit(submitHandler)} noValidate>
            <Stack spacing={4}>
              <FormControl isInvalid={Boolean(errors.password)} isRequired>
                <FormLabel id="password" htmlFor="password">
                  Password
                </FormLabel>
                <Input
                  id="password"
                  type="text"
                  placeholder="Password"
                  {...register("password", {
                    required: "This is required",
                  })}
                />
                <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={Boolean(errors.confirmPassword)} isRequired>
                <FormLabel id="confirmPassword" htmlFor="confirmPassword">
                  Confirm Password
                </FormLabel>
                <Input
                  id="confirmPassword"
                  type="text"
                  placeholder="confirmPassword"
                  {...register("confirmPassword", {
                    required: "This is required",
                  })}
                />
                <FormErrorMessage>
                  {errors.confirmPassword && errors.confirmPassword.message}
                </FormErrorMessage>
              </FormControl>

              <Button
                mt={4}
                rounded={"none"}
                colorScheme="teal"
                size={"xl"}
                isLoading={isSubmitting}
                type="submit"
              >
                Reset password
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
