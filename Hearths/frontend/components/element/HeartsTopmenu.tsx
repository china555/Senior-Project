import { Box, Divider } from "@chakra-ui/react";
import HeartsContainer from "../common/HeartsContainer";
import { Link } from "@chakra-ui/react";
import { useTranslation } from "../../hooks/useTranslation";
export const HeartsTopMenu = () => {
  const { translations, changeLocale } = useTranslation(
    "test",
    "SignUp",
    "SignIn"
  );

  return (
    <Box bg="PrimaryColor.900" color="white" fontWeight="medium">
      <HeartsContainer>
        <Box display="flex" justifyContent="space-between" py="2">
          <Box display="flex">
            <Box
              cursor="pointer"
              onClick={() => {
                changeLocale("en");
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
                changeLocale("th");
              }}
            >
              ไทย
            </Box>
          </Box>
          <Box display="flex">
            <Link href="/sign-up">{translations.SignUp}</Link>
            <Box px="2">
              <Divider orientation="vertical" />
            </Box>
            <Link href="/sign-in">{translations.SignIn}</Link>
          </Box>
        </Box>
      </HeartsContainer>
    </Box>
  );
};

HeartsTopMenu.displayName = "HeartsTopMenu";
