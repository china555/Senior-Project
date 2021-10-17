import { Box, Divider } from "@chakra-ui/react";
import HeartsContainer from "../common/HeartsContainer";
import { Link } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
export const HeartsTopMenu = () => {
  const { t, i18n } = useTranslation();
  return (
    <Box bg="PrimaryColor.900" color="white" fontWeight="medium">
      <HeartsContainer>
        <Box display="flex" justifyContent="space-between" py="2">
          <Box display="flex">
            <Box
              cursor="pointer"
              onClick={() => {
                i18n.changeLanguage("en");
                localStorage.setItem("language", "en");
              }}
            >
              Eng
            </Box>
            <Box px="2">
              <Divider orientation="vertical" />
            </Box>
            <Box
              cursor="pointer"
              onClick={() => {
                i18n.changeLanguage("th");
                localStorage.setItem("language", "th");
              }}
            >
              ไทย
            </Box>
          </Box>
          <Box display="flex">
            <Link>{t("SignUp")}</Link>
            <Box px="2">
              <Divider orientation="vertical" />
            </Box>
            <Link>{t("SignIn")}</Link>
          </Box>
        </Box>
      </HeartsContainer>
    </Box>
  );
};

HeartsTopMenu.displayName = "HeartsTopMenu";
