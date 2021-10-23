import { Flex, Image, Box } from "@chakra-ui/react";

export const HeartsFooter = () => {
  return (
    <Box bg="#7197AC" py="2rem">
      <Box mx="auto" w={{ base: "80%", lg: "40%", xl: "60%" }}>
        <Flex alignItems="center">
          <Box w="50%">
            <Box w={{ base: "50%", xl: "30%" }} mx="auto">
              <Image w="100%" src="/images/logo/hearts_logo.png" alt="" />
            </Box>
          </Box>
          <Box w="50%">
            <Box w="100%">
              <Image w="100%" src="/images/logo/mahidol-logo.png" alt="" />
            </Box>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};
