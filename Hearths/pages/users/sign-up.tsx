import { Button, Flex, Heading, Box, Link, useToast } from "@chakra-ui/react";
import type { NextPage } from "next";
import { HeartInput } from "../../components/element/HeartsInput";
import { useForm, FieldError } from "react-hook-form";
import { useRouter } from "next/router";
import axios from "axios";
import { url } from "../../constant";
import Cookies from "js-cookie";
import { useAppStore } from "../../store";

type SignUpForm = {
  username: string;
  password: string;
  email: string;
};
const errorMessages = (fieldName: string, errors: FieldError) => {
  const errorRequire = errors?.type === "required" ? "* required" : "";
  if (
    fieldName === "email" ||
    fieldName === "password" ||
    fieldName === "username"
  )
    return [errorRequire];
};
const UserSignUP: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>();
  const router = useRouter();
  const { dispatch } = useAppStore();
  const toast = useToast();
  const onSubmit = async (registerData: SignUpForm) => {
    try {
      console.log(registerData);
      const { data } = await axios.post(url + "/users/register", registerData);
      //   Cookies.set("token", data.jwtToken);
      //   Cookies.set("refreshtoken", data.refreshToken);
      //   Cookies.set("user_id", data.pt_no);
      //   dispatch("auth/setIsAuthenticated", true);
      //   toast({ status: "success", title: "Login successful" });
      router.push("/users/login");
    } catch (error) {
      console.error("Sign-in", error);
      toast({ status: "error", title: "Please check your email and password" });
    }
  };
  return (
    <Box mt="5rem">
      <Flex
        flexDirection={"column"}
        w={{ base: "90%", lg: "40%", xl: "40%" }}
        h="100%"
        justifyContent={"center"}
        borderRadius={"25px"}
        boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px"
        m="auto"
        py="2rem"
      >
        <Heading color="#003B71" as="h1" textAlign="center" mb="2rem">
          Sign Up
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex flexDirection="column" gridRowGap="15px">
            <Box mx={{ base: 0, xl: "30px" }}>
              <HeartInput
                {...register("username", { required: true })}
                type="username"
                placeholder="username"
                isRequired={true}
                isInvalid={errors.username?.type === "required"}
                errorMessages={errorMessages(
                  "email",
                  errors.username as FieldError
                )}
              />
            </Box>
            <Box mx={{ base: 0, xl: "30px" }}>
              <HeartInput
                {...register("password", { required: true })}
                placeholder="Password"
                type="password"
                isRequired={true}
                isInvalid={errors.password?.type === "required"}
                errorMessages={errorMessages(
                  "password",
                  errors.password as FieldError
                )}
              />
            </Box>
            <Box mx={{ base: 0, xl: "30px" }}>
              <HeartInput
                {...register("email", {
                  required: true,
                })}
                placeholder="Email"
                type="text"
                isRequired={true}
                isInvalid={errors.password?.type === "required"}
                errorMessages={errorMessages(
                  "email",
                  errors.password as FieldError
                )}
              />
            </Box>
            <Flex flexDirection="column" mx={{ base: 0, xl: "30px" }}>
              <Button
                my="1rem"
                bg="ButtonColor"
                borderRadius="35px"
                color="white"
                py="30px"
                fontSize="1.6rem"
                type="submit"
              >
                Sign Up
              </Button>
            </Flex>
          </Flex>
        </form>
      </Flex>
    </Box>
  );
};

export default UserSignUP;
