import { Button, Flex, Heading, Box, Link, useToast } from "@chakra-ui/react";
import type { NextPage } from "next";
import { HeartInput } from "../components/element/HeartsInput";
import { HeartsLayouts } from "../layouts/layout";
import { useForm, SubmitHandler, FieldError } from "react-hook-form";
import { useRouter } from "next/router";
import axios from "axios";
import { url } from "../constant";
import Cookies from "js-cookie";

type LogInForm = {
  username: string;
  password: string;
};
const errorMessages = (fieldName: string, errors: FieldError) => {
  const errorRequire = errors?.type === "required" ? "* required" : "";
  if (fieldName === "email" || fieldName === "password") return [errorRequire];
};
const SignIn: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LogInForm>();
  const router = useRouter();
  const toast = useToast;
  const onSubmit = async (loginData: LogInForm) => {
    try {
      const { data } = await axios.post(url + "/patients/login", loginData);
      Cookies.set("token", data.jwtToken);
      Cookies.set("refreshtoken", data.refreshToken);
      Cookies.set("patient_id", data.patient_id);
    } catch (error) {
      console.error("Sign-in", error);
      toast({ status: "error", title: "Submit failed" });
    }
    router.push("/");
  };
  return (
    <HeartsLayouts>
      <Flex
        flexDirection="column"
        mt="2rem"
        gridRowGap="15px"
        w={{ base: "70%", lg: "40%", xl: "30%" }}
        mx="auto"
      >
        <Heading color="#003B71" as="h1" textAlign="center">
          Sign In
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
                Sign In
              </Button>
              <Link textAlign="center" as="h3" size="sm" fontWeight="medium">
                Forgot your password?
              </Link>
            </Flex>
          </Flex>
        </form>
      </Flex>
    </HeartsLayouts>
  );
};

export default SignIn;
