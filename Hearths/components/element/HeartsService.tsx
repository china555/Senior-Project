import { Box, Heading, Flex, Image, Divider } from "@chakra-ui/react";
import { useTranslation } from "../../hooks/useTranslation";
import HeartsContainer from "../common/HeartsContainer";

export const HeartsService = () => {
  const { translations } = useTranslation(
    "Appointment",
    "MyAppointment",
    "RequestDocument",
    "VDOCallService"
  );
  return (
    <HeartsContainer>
      <Box mt="4rem" textAlign="center">
        <Box>
          <Heading color="#003B71" as="h1">
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
            <Box w={{ base: "20%", xl: "20%" }} mx="auto">
              <Image w="100%" alt="calendar" src="/images/icons/calendar.png" />
            </Box>
            <Box>{translations.Appointment}</Box>
          </Box>
          <Box mt={{ base: "2%", xl: "0" }} width={{ base: "100%", xl: "50%" }}>
            <Box w={{ base: "20%", xl: "20%" }} mx="auto">
              <Image
                w="100%"
                alt="appointment"
                src="/images/icons/appoint.png"
              />
            </Box>
            <Box>{translations.MyAppointment}</Box>
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
            <Box w={{ base: "20%", xl: "20%" }} mx="auto">
              <Image w="100%" alt="document" src="/images/icons/document.png" />
            </Box>
            <Box>{translations.RequestDocument}</Box>
          </Box>
          <Box mt={{ base: "2%", xl: "0" }} width={{ base: "100%", xl: "50%" }}>
            <Box w={{ base: "20%", xl: "20%" }} mx="auto">
              <Image w="100%" alt="vdocall" src="/images/icons/vdocall.png" />
            </Box>
            <Box>{translations.VDOCallService}</Box>
          </Box>
        </Flex>
      </Box>
    </HeartsContainer>
  );
};
