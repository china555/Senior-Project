import { Box, Image, Link, Button } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import HeartsContainer from "../common/HeartsContainer";

export const BannerHearths = () => {
  const { t } = useTranslation();
  return (
    <Box>
      <Box
        w="100%"
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
            Welcome To
          </Box>
          <Box
            textShadow="-1px 1px 0 #FFFFFF,
                          1px 1px 0 #FFFFFF,
                         1px -1px 0 #FFFFFF,
                        -1px -1px 0 #FFFFFF;"
            fontSize="4xl"
            fontWeight="800"
          >
            HeaRTS
            <br />
            Health Care Tele Delivery Service
          </Box>
          <Box
            textShadow="-1px 1px 0 #FFFFFF,
                          1px 1px 0 #FFFFFF,
                         1px -1px 0 #FFFFFF,
                        -1px -1px 0 #FFFFFF;"
            fontSize="2xl"
          >
            One More Reason To Be Healthy
          </Box>
          <Box mt="2">
            <Link>
              <Button
                borderRadius="20"
                color="white"
                bg="SecondaryColor"
                fontSize="lg"
                p="6"
              >
                {t("Appointment")}
              </Button>
            </Link>
          </Box>
        </HeartsContainer>
      </Box>
    </Box>
  );
};
