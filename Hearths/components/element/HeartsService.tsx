import { Box, Heading, Flex, Image, Divider } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useTranslation } from "../../hooks/useTranslation";
import HeartsContainer from "../common/HeartsContainer";

export const HeartsService = () => {
  const router = useRouter();
  const { translations } = useTranslation(
    "Appointment",
    "MyAppointment",
    "RequestDocument",
    "VDOCallService",
    "Service"
  );
  return (
    <HeartsContainer>
      <Box mt="4rem" id="services" textAlign="center">
        <Box>
          <Heading color="#003B71" as="h1" pt="3rem">
            {translations.Service}
          </Heading>
        </Box>
        <Flex
          mt="5%"
          flexWrap="wrap"
          fontSize={{ base: "1.3em" }}
          flexDirection={{ base: "column", xl: "row" }}
          justifyContent="space-between"
        >
          {/* 1 */}
          <Box
            mt={{ base: "2%", xl: "0" }}
            width={{ base: "100%", xl: "50%" }}
            borderRight={{ base: "0", xl: "4px solid" }}
            borderColor={{ base: "SecondaryColor", xl: "SecondaryColor" }}
            onClick={() => {
              router.push("/appointment");
            }}
          >
            <Box w={{ base: "20%", xl: "20%" }} mx="auto" cursor={"pointer"}>
              <Image w="100%" alt="calendar" src="/images/icons/calendar.png" />
            </Box>
            <Box>{translations.Appointment}</Box>
          </Box>
          {/* 2 */}
          <Box
            mt={{ base: "2%", xl: "0" }}
            width={{ base: "100%", xl: "50%" }}
            onClick={() => {
              router.push("/my-appointment");
            }}
          >
            <Box w={{ base: "20%", xl: "20%" }} mx="auto" cursor={"pointer"}>
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
          {/* 3 */}
          <Box
            mt={{ base: "3%", xl: "0" }}
            width={{ base: "100%", xl: "50%" }}
            borderRight={{ base: "0px", xl: "4px" }}
            borderColor={{ base: "SecondaryColor", xl: "SecondaryColor" }}
            onClick={() => {
              router.push("/request/document");
            }}
          >
            <Box w={{ base: "20%", xl: "20%" }} mx="auto" cursor={"pointer"}>
              <Image w="100%" alt="document" src="/images/icons/document.png" />
            </Box>
            <Box>{translations.RequestDocument}</Box>
          </Box>
          {/* 4 */}
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
