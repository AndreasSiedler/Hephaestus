import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Input,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { User } from "../../../util/types";

type IFormInput = {
  name: string;
  email: string;
  bio: string;
  location: string;
  blog: string;
  status: string;
};

interface ProfilePageProps {
  user?: User;
}

const ProfileUpdate: React.FC<ProfilePageProps> = ({ user }) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>({
    defaultValues: useMemo(() => {
      return user;
    }, []),
  });

  async function onSubmit(values: IFormInput) {
    console.log(values);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack spacing={4}>
        <FormControl isInvalid={Boolean(errors.name)} isRequired>
          {/* <FormLabel id="name" htmlFor="name">
            Name
          </FormLabel> */}
          <Input
            id="name"
            type="text"
            placeholder="Name"
            {...register("name", {
              required: "This is required",
            })}
          />
          <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.email)} isRequired>
          {/* <FormLabel id="email" htmlFor="email">
            Email
          </FormLabel> */}
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
          <FormHelperText>We'll never share your email.</FormHelperText>

          <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.bio)} isRequired>
          {/* <FormLabel id="bio" htmlFor="bio">
            Bio
          </FormLabel> */}
          <Textarea
            id="bio"
            placeholder="Bio"
            {...register("bio", {
              required: "This is required",
            })}
          />
          <FormErrorMessage>{errors.bio && errors.bio.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.location)} isRequired>
          {/* <FormLabel id="location" htmlFor="location">
            Location
          </FormLabel> */}
          <Input
            id="location"
            type="text"
            placeholder="Location"
            {...register("location", {
              required: "This is required",
            })}
          />
          <FormErrorMessage>{errors.location && errors.location.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.blog)}>
          {/* <FormLabel id="blog" htmlFor="blog">
            Website
          </FormLabel> */}
          <Input id="blog" type="text" placeholder="Website" {...register("blog")} />
          <FormErrorMessage>{errors.blog && errors.blog.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.status)} isRequired>
          {/* <FormLabel id="location" htmlFor="location">
            Location
          </FormLabel> */}
          <Input
            id="status"
            type="text"
            placeholder="Status"
            {...register("status", {
              required: "This is required",
            })}
          />
          <FormErrorMessage>{errors.status && errors.status.message}</FormErrorMessage>
        </FormControl>

        <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
          Finish
        </Button>
      </Stack>
    </form>
  );
};
export default ProfileUpdate;
