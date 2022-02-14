import type { NextPage } from "next";
import { HeartsAboutUs } from "../components/element/HeartsAboutUs";
import { HeartsBanner } from "../components/element/HeartsBanner";
import { HeartsContactUs } from "../components/element/HeartsContactus";
import { HeartsService } from "../components/element/HeartsService";
import { HeartsLayouts } from "../layouts/layout";
import { Box } from "@chakra-ui/react";
import { HeartsOverview } from "../components/element/HeartsOverview";

const Home: NextPage = () => {
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
    </HeartsLayouts>
  );
};

export default Home;
