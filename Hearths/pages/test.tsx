import { Heading } from "@chakra-ui/react";
import type { NextPage } from "next";
import HeartsContainer from "../components/common/HeartsContainer";
import { HeartsOmise } from "../components/element/HeartsOmisePayment";
import { useTranslation } from "../hooks/useTranslation";
import { HeartsLayouts } from "../layouts/layout";
const Test: NextPage = () => {
  const { translations } = useTranslation("Question");
  return (
    <HeartsLayouts>
      <HeartsContainer>
        <Heading color="#046483" as="h1" textAlign="center" my="5">
          TEST
        </Heading>
        <HeartsOmise />
      </HeartsContainer>
    </HeartsLayouts>
  );
};

export default Test;
