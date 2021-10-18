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
        <Flex
          mt="5%"
          flexWrap="wrap"
          fontSize={{ base: "1.3em" }}
          flexDirection={{ base: "column", xl: "row" }}
          justifyContent="space-between"
        >
          <Box
            mt={{ base: "2%", xl: "0" }}
            width={{ base: "100%", xl: "50%" }}
            borderRight={{ base: "0", xl: "4px solid" }}
            borderColor={{ base: "SecondaryColor", xl: "SecondaryColor" }}
          >
            <Box w={{ base: "30%", xl: "20%" }} mx="auto">
              <Image w="100%" alt="" src="/images/icons/calendar.png" />
            </Box>
            <Box>{t("Appointment")}</Box>
          </Box>
          <Box mt={{ base: "2%", xl: "0" }} width={{ base: "100%", xl: "50%" }}>
            <Box w={{ base: "30%", xl: "20%" }} mx="auto">
              <Image w="100%" alt="" src="/images/icons/appoint.png" />
            </Box>
            <Box>{t("Appointment")}</Box>
          </Box>
          <Divider
            my={{ base: "0", xl: "2%" }}
            borderColor="SecondaryColor"
            opacity="1"
            borderBottomWidth={{ base: "0", xl: "4px" }}
          />
          <Box
            mt={{ base: "3%", xl: "0" }}
            width={{ base: "100%", xl: "50%" }}
            borderRight={{ base: "0px", xl: "4px" }}
            borderColor={{ base: "SecondaryColor", xl: "SecondaryColor" }}
          >
            <Box w={{ base: "30%", xl: "20%" }} mx="auto">
              <Image w="100%" alt="" src="/images/icons/document.png" />
            </Box>
            <Box>{t("Appointment")}</Box>
          </Box>
          <Box mt={{ base: "2%", xl: "0" }} width={{ base: "100%", xl: "50%" }}>
            <Box w={{ base: "30%", xl: "20%" }} mx="auto">
              <Image w="100%" alt="" src="/images/icons/vdocall.png" />
            </Box>
            <Box>{t("Appointment")}</Box>
          </Box>
        </Flex>
      </Box>
    </HeartsContainer>
  );
};
