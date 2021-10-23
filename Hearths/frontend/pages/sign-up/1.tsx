import { Button, Center, Heading } from "@chakra-ui/react";
import type { NextPage } from "next";
import { HeartInput } from "../../components/element/HeartsInput";
import { HeartsLayouts } from "../../layouts/layout";
const SignUp: NextPage = () => {
  return (
    <HeartsLayouts>
      <Center>
        <Heading color="#003B71" as="h1" textAlign="center">
          Sign up
          <HeartInput placeholder="ID Card Number" />
        </Heading>
      </Center>
    </HeartsLayouts>
  );
};

export default SignUp;
