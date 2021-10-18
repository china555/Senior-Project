import { Flex, Image, Box } from "@chakra-ui/react";

export const HeartsFooter = () => {
  return (
    <Flex justifyContent="center" bg="#4D7C97CC" py="2rem">
      <Box w={{ base: "90%", xl: "60%" }}>
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
    </Flex>
  );
};
