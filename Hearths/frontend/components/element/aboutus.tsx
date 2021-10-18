import { Box, Heading, Flex, Image, Text, Button } from "@chakra-ui/react";
import HeartsContainer from "../common/HeartsContainer";

export const HearthsAboutUs = () => {
  return (
    <Box bg="PrimaryColor.bg" mt={{ base: "2rem", xl: "5rem" }}>
      <HeartsContainer>
        <Heading
          textDecor="underline"
          color="#003B71"
          as="h1"
          textAlign="center"
        >
          About Us
        </Heading>
        <Flex flexWrap="wrap">
          <Box w={{ base: "100%", xl: "50%" }}>
            <Box w={{ base: "50%", xl: "40%" }} mx="auto">
              <Image w="100%" alt="" src="/images/logo/hearts_logo.png" />
            </Box>
          </Box>
          <Box w={{ base: "100%", xl: "50%" }}>
            <Box w="90%" mx="auto">
              <Heading as="h2" size="lg" mt={{ base: "1rem", xl: "0" }}>
                We are <span style={{ color: "#225378" }}>Hea</span>
                <span style={{ color: "#EB7F00" }}>RTS</span> a <br /> Health
                Care Tele Delivery Service
              </Heading>
              <Text>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industrys standard dummy text
                ever since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </Text>
              <Box mt="2rem">
                <Button
                  mr="1rem"
                  py="2rem"
                  size="lg"
                  borderRadius="30px"
                  bg="white"
                  color="ThirdColor"
                  boxShadow="xl"
                >
                  Contact Us
                </Button>
                <Button
                  py="2rem"
                  size="lg"
                  borderRadius="30px"
                  bg="ThirdColor"
                  color="white"
                  boxShadow="xl"
                >
                  Our Team
                </Button>
                <br />
                <Button
                  mt="1rem"
                  py="2rem"
                  px="3.2rem"
                  size="lg"
                  borderRadius="30px"
                  bg="ThirdColor"
                  color="white"
                  boxShadow="xl"
                >
                  FAQ
                </Button>
              </Box>
            </Box>
          </Box>
        </Flex>
      </HeartsContainer>
    </Box>
  );
};
