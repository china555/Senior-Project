import type { NextPage } from "next";
import { HeartsAboutUs } from "../components/element/HeartsAboutUs";
import { HeartsBanner } from "../components/element/HeartsBanner";
import { HeartsContactUs } from "../components/element/HeartsContactus";
import { HeartsService } from "../components/element/HeartsService";
import { HeartsLayouts } from "../layouts/layout";
import { useTranslation } from "../hooks/useTranslation";
import { Box } from "@chakra-ui/react";
import { HeartsOverview } from "../components/element/HeartsOverview";

const Home: NextPage = () => {
  const { translations, changeLocale } = useTranslation("test");
  return (
    <HeartsLayouts>
      <HeartsBanner />
      <Box id="services" />
      <HeartsService />
      <Box id="overview" />
      <HeartsOverview />
      <Box id="aboutus" />
      <HeartsAboutUs />
      <Box id="contactus" />
      <HeartsContactUs />
      <Box bg="PrimaryColor.900" p="2">
        {""}
      </Box>
    </HeartsLayouts>
  );
};

export default Home;
