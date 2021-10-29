import { Box, Heading, Flex, Image } from "@chakra-ui/react";
import HeartsContainer from "../common/HeartsContainer";

export const HeartsContactUs = () => {
  return (
    <Box id="contactus" my={{ base: "2rem", xl: "2rem" }}>
      <HeartsContainer>
        <Heading
          textDecor="underline"
          color="#003B71"
          as="h1"
          textAlign="center"
        >
          Contact Us
        </Heading>
        <Flex flexWrap="wrap" mt="2rem">
          <Box w={{ base: "100%", xl: "50%" }} textAlign="center">
            <Box fontSize="2.5rem">GOOGLE MAP</Box>
          </Box>
          <Box w={{ base: "100%", xl: "50%" }}>
            <Flex w="100%" bg="PrimaryColor.bg" padding="2" alignItems="center">
              <Box w="20%">
                <Image
                  w="60%"
                  src="/images/icons/crossroads_23760.png"
                  alt=""
                />
              </Box>
              <Box w="80%">Wat thra phra</Box>
            </Flex>
            <Flex
              w="100%"
              bg="PrimaryColor.bg"
              padding="2"
              alignItems="center"
              mt="4"
            >
              <Box w="20%">
                <Image w="60%" src="/images/icons/mail_23797.png" alt="" />
              </Box>
              <Box w="80%">hearths@gmail.com</Box>
            </Flex>
            <Flex
              w="100%"
              bg="PrimaryColor.bg"
              padding="2"
              alignItems="center"
              mt="4"
            >
              <Box w="20%">
                <Image w="60%" src="/images/icons/phone_23732.png" alt="" />
              </Box>
              <Box w="80%">091-111-0258</Box>
            </Flex>
          </Box>
        </Flex>
      </HeartsContainer>
    </Box>
  );
};
