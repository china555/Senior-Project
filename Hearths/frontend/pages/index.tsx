import type { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { HearthsAboutUs } from "../components/element/aboutus";
import { HearthsBanner } from "../components/element/banner";
import { HeartsContactUs } from "../components/element/contactus";
import { HeartsService } from "../components/element/service";
import { HeartsLayouts } from "../layouts/layout";

const Home: NextPage = () => {
  return (
    <HeartsLayouts>
      <HearthsBanner />
      <HeartsService />
      <HearthsAboutUs />
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

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default Home;
