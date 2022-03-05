import { Button, Flex, Heading, Box, Link, useToast } from "@chakra-ui/react";
import type { NextPage } from "next";
import { HeartInput } from "../../components/element/HeartsInput";
import { useForm, FieldError } from "react-hook-form";
import { useRouter } from "next/router";
import axios from "axios";
import { url } from "../../constant";
import Cookies from "js-cookie";
import { useAppStore } from "../../store";

type LogInForm = {
  username: string;
  password: string;
};
const errorMessages = (fieldName: string, errors: FieldError) => {
  const errorRequire = errors?.type === "required" ? "* required" : "";
  if (fieldName === "email" || fieldName === "password") return [errorRequire];
};
const UsersLogin: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LogInForm>();
  const router = useRouter();
  const { dispatch } = useAppStore();
  const toast = useToast();
  const onSubmit = async (loginData: LogInForm) => {
    try {
      const { data } = await axios.post(url + "/users/login", loginData);
      Cookies.set("token", data.jwtToken);
      Cookies.set("refreshtoken", data.refreshToken);
      Cookies.set("user_id", data.user_id);
      dispatch("auth/setIsAuthenticated", true);
      toast({ status: "success", title: "Login successful" });
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
          Log In
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex flexDirection="column" gridRowGap="15px">
            <Box mx={{ base: 0, xl: "30px" }}>
              <HeartInput
                {...register("username", { required: true })}
                type="email"
                placeholder="Email"
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
                Log In
              </Button>
              <Link textAlign="center" as="h3" size="sm" fontWeight="medium">
                Forgot your password?
              </Link>
            </Flex>
          </Flex>
        </form>
      </Flex>
    </Box>
  );
};

export default UsersLogin;
