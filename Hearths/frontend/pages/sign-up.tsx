import { Button, Flex, Heading, Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import { HeartInput } from "../components/element/HeartsInput";
import { HeartsLayouts } from "../layouts/layout";
const SignUp: NextPage = () => {
  const idCardToolTip = `It is used for your identification and is used only 
                         in this process. It will not be used for anything else`;
  return (
    <HeartsLayouts>
      <Flex flexDirection="column" gridRowGap="15px" w="30%" mx="auto">
        <Heading color="#003B71" as="h1" textAlign="center">
          Sign up
        </Heading>
        <Box>
          <HeartInput
            placeholder="ID Card Number"
            toolTipText={idCardToolTip}
          />
        </Box>
        <Box pr="50px">
          <HeartInput placeholder="Email" />
        </Box>
        <Box pr="50px">
          <HeartInput placeholder="Password" type="password" />
        </Box>
      </Flex>
    </HeartsLayouts>
  );
};

export default SignUp;
