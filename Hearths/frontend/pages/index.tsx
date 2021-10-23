import type { NextPage } from "next";
import { HeartsAboutUs } from "../components/element/HeartsAboutUs";
import { HeartsBanner } from "../components/element/HeartsBanner";
import { HeartsContactUs } from "../components/element/HeartsContactus";
import { HeartsService } from "../components/element/HeartsService";
import { HeartsLayouts } from "../layouts/layout";
import { useTranslation } from "../hooks/useTranslation";
import { Button } from "@chakra-ui/react";

const Home: NextPage = () => {
  const { translations, changeLocale } = useTranslation("test");
  console.log("translation-result", translations);
  return (
    <HeartsLayouts>
      <Button
        onClick={() => {
          changeLocale(translations.currentLocale === "en" ? "th" : "en");
        }}
      >
        change language
      </Button>
      <HeartsBanner />
      <HeartsService />
      <HeartsAboutUs />
      <HeartsContactUs />
    </HeartsLayouts>
    //       {/* <Box width={["100%", "30%"]} mx="auto">
    //         {t("test")}
    //         <HeartInput
    //           placeholder="User name"
    //           toolTipText="It is used for your identification and is used only
    // in this process. It will not be used for anything else"
    //         />
    //         <Button
    //           onClick={() => {
    //             console.log("i", i18n);
    //             i18n.changeLanguage(i18n.language === "en" ? "th" : "en");
    //           }}
    //         >
    //           Change Language
    //         </Button>
    //       </Box> */}
  );
};

export default Home;
