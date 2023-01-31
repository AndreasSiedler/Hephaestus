import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  HStack,
  Input,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";

type IFormInput = {
  name?: string;
  email?: string;
  bio?: string;
  location?: string;
};

interface ProfilePageProps {
  data?: IFormInput;
  onChange: (values: IFormInput) => void;
}

const UpdateUser: React.FC<ProfilePageProps> = ({ data, onChange }) => {
  const {
    watch,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: useMemo(() => {
      return {
        bio: data?.bio,
        email: data?.email,
        location: data?.location,
        name: data?.name,
      };
    }, []),
  });
  const watchAllFields = watch(); // when pass nothing as argument, you are watching everything

  useEffect(() => {
    onChange(watchAllFields);
  }, [watchAllFields]);

  async function onSubmit(values: IFormInput) {
    try {
      console.log(values);
    } catch (error) {}
  }

  return (
    <FormControl onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <HStack>
          <FormControl isInvalid={Boolean(errors.name)} isRequired>
            {/* <FormLabel id="name" htmlFor="name">
            Name
          </FormLabel> */}
            <Input
              id="name"
              size={"lg"}
              variant={"filled"}
              type="text"
              placeholder="Name"
              {...register("name", {
                required: "This is required",
              })}
            />
            <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={Boolean(errors.location)} isRequired>
            {/* <FormLabel id="location" htmlFor="location">
            Location
          </FormLabel> */}
            <Input
              id="location"
              size={"lg"}
              variant={"filled"}
              type="text"
              placeholder="Location"
              {...register("location", {
                required: "This is required",
              })}
            />
            <FormErrorMessage>{errors.location && errors.location.message}</FormErrorMessage>
          </FormControl>
        </HStack>
        <FormControl isInvalid={Boolean(errors.email)} isRequired>
          {/* <FormLabel id="email" htmlFor="email">
            Email
          </FormLabel> */}
          <Input
            id="email"
            size={"lg"}
            variant={"filled"}
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
          <FormHelperText ml={5}>We'll never share your email.</FormHelperText>

          <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.bio)} isRequired>
          {/* <FormLabel id="bio" htmlFor="bio">
            Bio
          </FormLabel> */}
          <Textarea
            id="bio"
            size={"lg"}
            variant={"filled"}
            mt={10}
            placeholder="Bio"
            {...register("bio", {
              required: "This is required",
            })}
          />
          <FormErrorMessage>{errors.bio && errors.bio.message}</FormErrorMessage>
        </FormControl>
      </Stack>
    </FormControl>
  );
};
export default UpdateUser;
