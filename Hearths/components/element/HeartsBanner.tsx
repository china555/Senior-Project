import { Box, Image, Link, Button } from "@chakra-ui/react";
import HeartsContainer from "../common/HeartsContainer";
import { useTranslation } from "../../hooks/useTranslation";
import { useRouter } from "next/router";
export const HeartsBanner = () => {
  const router = useRouter();
  const appointment = () => {
    router.push("appointment");
  };
  const { translations } = useTranslation("Appointment", "welcome", "slogan");
  return (
    <Box>
      <Box
        w="100%"
        h="35rem"
        bgImg="url('/images/banner/banner-image.png')"
        bgRepeat="no-repeat"
        bgSize="cover"
        bgPos="100% 25%"
        pt={["3rem", "4rem", "8rem"]}
        pb={["3rem", "4rem", "10rem"]}
      >
        <HeartsContainer>
          <Box
            color="#2188E7"
            textShadow="-1px 1px 0 #FFFFFF,
                          1px 1px 0 #FFFFFF,
                         1px -1px 0 #FFFFFF,
                        -1px -1px 0 #FFFFFF;"
            fontSize="2xl"
          >
            {translations.welcome}
          </Box>
          <Box
            textShadow="-1px 1px 0 #FFFFFF,
                          1px 1px 0 #FFFFFF,
                         1px -1px 0 #FFFFFF,
                        -1px -1px 0 #FFFFFF;"
            fontSize="4xl"
            fontWeight="800"
          >
            <span style={{ color: "#225378" }}>Hea</span>
            <span style={{ color: "#EB7F00" }}>RTS</span>
            <br />
            <span style={{ color: "#225378" }}>Hea</span>lthca
            <span style={{ color: "#EB7F00" }}>R</span>e{" "}
            <span style={{ color: "#EB7F00" }}>T</span>ele-delivery{" "}
            <span style={{ color: "#EB7F00" }}>S</span>ervice
          </Box>
          <Box
            textShadow="-1px 1px 0 #FFFFFF,
                          1px 1px 0 #FFFFFF,
                         1px -1px 0 #FFFFFF,
                        -1px -1px 0 #FFFFFF;"
            fontSize="2xl"
          >
            {translations.slogan}
          </Box>
          <Box mt="2">
            <Button
              borderRadius="20"
              color="white"
              bg="SecondaryColor"
              fontSize="lg"
              p="6"
              onClick={appointment}
            >
              {translations.Appointment}
            </Button>
          </Box>
        </HeartsContainer>
      </Box>
    </Box>
  );
};
