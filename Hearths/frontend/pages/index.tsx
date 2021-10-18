import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { HearthsAboutUs } from "../components/element/aboutus";
import { HearthsBanner } from "../components/element/banner";
import { HeartInput } from "../components/element/Input";
import { HeartsNavbar } from "../components/element/narbar";
import { HeartsService } from "../components/element/service";
import { HeartsTopMenu } from "../components/element/topmenu";

const Home: NextPage = () => {
  const { t, i18n } = useTranslation();
  return (
    <Box>
      <HeartsTopMenu />
      <HeartsNavbar />
      <HearthsBanner />
      <HeartsService />
      <HearthsAboutUs />
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

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default Home;
