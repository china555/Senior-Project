import { Box, Heading, Flex, Image, Divider } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import HeartsContainer from "../common/HeartsContainer";

export const HeartsService = () => {
  const { t } = useTranslation();
  return (
    <HeartsContainer>
      <Box mt={{ base: "2rem", xl: "5rem" }} textAlign="center">
        <Box>
          <Heading textDecor="underline" color="#003B71" as="h1">
            Our Services
          </Heading>
        </Box>
        <Flex mt="5%" flexWrap="wrap">
          <Box width="50%" borderRight="2px solid" borderColor="SecondaryColor">
            <Box w="20%" mx="auto">
              <Image w="100%" alt="" src="/images/icons/calendar.png" />
            </Box>
            <Box>{t("Appointment")}</Box>
          </Box>
          <Box width="50%">
            <Box w="20%" mx="auto">
              <Image w="100%" alt="" src="/images/icons/calendar.png" />
            </Box>
            <Box>{t("Appointment")}</Box>
          </Box>
          <Divider my="2%" />
          <Box width="50%" borderRight="2px solid" borderColor="SecondaryColor">
            <Box w="20%" mx="auto">
              <Image w="100%" alt="" src="/images/icons/calendar.png" />
            </Box>
            <Box>{t("Appointment")}</Box>
          </Box>
          <Box width="50%">
            <Box w="20%" mx="auto">
              <Image w="100%" alt="" src="/images/icons/calendar.png" />
            </Box>
            <Box>{t("Appointment")}</Box>
          </Box>
        </Flex>
      </Box>
    </HeartsContainer>
  );
};
