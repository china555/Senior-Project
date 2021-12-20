import { Box, Heading, Flex, Image, Text, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useTranslation } from "../../hooks/useTranslation";

import HeartsContainer from "../common/HeartsContainer";

export const HeartsAboutUs = () => {
  const { translations } = useTranslation(
    "FAQ",
    "Contact",
    "OurTeam",
    "AboutUs"
  );
  const router = useRouter();
  return (
    <Box mt="4rem">
      <HeartsContainer>
        <Heading color="#003B71" as="h1" textAlign="center" pt="5">
          {translations.AboutUs}
        </Heading>
        <Flex flexWrap="wrap" mt="5">
          <Box w={{ base: "100%", xl: "50%" }}>
            <Box w={{ base: "50%", xl: "40%" }} mx="auto">
              <Image w="100%" alt="Hearts" src="/images/logo/logo tpt.png" />
            </Box>
          </Box>
          <Box w={{ base: "100%", xl: "50%" }}>
            <Box w="90%" mx="auto">
              <Heading as="h2" size="lg" mt={{ base: "1rem", xl: "0" }}>
                We are
                <span style={{ color: "#EB7F00" }}> TPT</span> a <br />{" "}
                <span style={{ color: "#225378" }}>Hea</span>lthca
                <span style={{ color: "#EB7F00" }}>R</span>e{" "}
                <span style={{ color: "#EB7F00" }}>T</span>ele-delivery
                <span style={{ color: "#EB7F00" }}> S</span>ervice
              </Heading>
              <Text>
                Tele-Physical therapy, Tele-occupational therapy, service mind,
                easy access, anytime, anywhere, designed just for you
              </Text>
              <Box mt="2rem" display="flex" flexWrap="wrap">
                <Button
                  py="2rem"
                  mx="1"
                  size="lg"
                  borderRadius="30px"
                  bg="white"
                  color="ThirdColor"
                  boxShadow="xl"
                  onClick={() => {
                    router.push("#contactus");
                  }}
                >
                  {translations.Contact}
                </Button>
                <Button
                  mx="1"
                  py="2rem"
                  px="3.2rem"
                  size="lg"
                  borderRadius="30px"
                  bg="ThirdColor"
                  color="white"
                  boxShadow="xl"
                  onClick={() => {
                    router.push("/FAQ");
                  }}
                >
                  {translations.FAQ}
                </Button>
                <Button
                  mx="1"
                  mt={{ base: "3", sm: "0" }}
                  py="2rem"
                  size="lg"
                  borderRadius="30px"
                  bg="ThirdColor"
                  color="white"
                  boxShadow="xl"
                  onClick={() => {
                    router.push("/our-team");
                  }}
                >
                  {translations.OurTeam}
                </Button>
              </Box>
            </Box>
          </Box>
        </Flex>
      </HeartsContainer>
    </Box>
  );
};
