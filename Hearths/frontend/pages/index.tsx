import type { NextPage } from "next";
import { HeartsAboutUs } from "../components/element/HeartsAboutUs";
import { HeartsBanner } from "../components/element/HeartsBanner";
import { HeartsContactUs } from "../components/element/HeartsContactus";
import { HeartsService } from "../components/element/HeartsService";
import { HeartsLayouts } from "../layouts/layout";
import { useTranslation } from "../hooks/useTranslation";
import { Box } from "@chakra-ui/react";

const Home: NextPage = () => {
  const { translations, changeLocale } = useTranslation("test");
  console.log("translation-result", translations);
  return (
    <HeartsLayouts>
      <HeartsBanner />
      <Box id="services" />
      <HeartsService />
      <Box id="aboutus" />
      <HeartsAboutUs />
      <Box id="contactus" />
      <HeartsContactUs />
    </HeartsLayouts>
  );
};

export default Home;
