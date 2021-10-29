import { Button, Flex, Heading, Box, Link } from "@chakra-ui/react";
import type { NextPage } from "next";
import { HeartInput } from "../components/element/HeartsInput";
import { HeartsLayouts } from "../layouts/layout";
import { useForm, SubmitHandler } from "react-hook-form";

type LogInForm = {
  email: string;
  password: string;
};

const SignIn: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LogInForm>();

  const onSubmit = (data: any) => console.log(data);
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
              <HeartInput type="email" placeholder="Email" />
            </Box>
            <Box mx={{ base: 0, xl: "30px" }}>
              <HeartInput placeholder="Password" type="password" />
            </Box>
            <Flex flexDirection="column" mx={{ base: 0, xl: "30px" }}>
              <Button
                my="1rem"
                bg="ButtonColor"
                borderRadius="35px"
                color="white"
                py="30px"
                fontSize="1.6rem"
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
