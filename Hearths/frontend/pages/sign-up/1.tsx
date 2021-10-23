import { Button, Center, Heading } from "@chakra-ui/react";
import type { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { HeartInput } from "../../components/element/Input";
import { HeartsLayouts } from "../../layouts/layout";
import { useTranslation } from "next-i18next";
const SignUp: NextPage = () => {
  return (
    <HeartsLayouts>
      <Center>
        <Heading color="#003B71" as="h1" textAlign="center">
          Sign up
          <HeartInput placeholder="ID Card Number" />
        </Heading>
      </Center>
    </HeartsLayouts>
  );
};
export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
export default SignUp;
