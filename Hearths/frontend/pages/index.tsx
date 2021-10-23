import { Box, Button } from "@chakra-ui/react";
import type { NextPage } from "next";
import { HeartsNavbar } from "../components/element/narbar";
import { HeartsTopMenu } from "../components/element/topmenu";
import { useTranslation } from "../hooks/useTranslation";

const Home: NextPage = () => {
  const { translations, changeLocale } = useTranslation(
    "currentLocale",
    "test"
  );
  console.log("translation-result", translations);

  return (
    <Box>
      <HeartsTopMenu />
      <HeartsNavbar />
      <Button
        onClick={() => {
          changeLocale(translations.currentLocale === "en" ? "th" : "en");
        }}
      >
        change language
      </Button>
      {/* <Box width={["100%", "30%"]} mx="auto">
        {t("test")}
        <HeartInput
          placeholder="User name"
          toolTipText="It is used for your identification and is used only 
in this process. It will not be used for anything else"
        />
        <Button
          onClick={() => {
            console.log("i", i18n);
            i18n.changeLanguage(i18n.language === "en" ? "th" : "en");
          }}
        >
          Change Language
        </Button>
      </Box> */}
    </Box>
  );
};

export default Home;
