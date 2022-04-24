import { Box, Heading, Flex, Image, Text, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useTranslation } from "../../hooks/useTranslation";
import Script from "next/script";
import HeartsContainer from "../common/HeartsContainer";
import { useEffect } from "react";

export const HeartsOmise = () => {
  const { translations } = useTranslation("Overview", "TopicOverview");
  const router = useRouter();
  return (
    <>
      <Box bg="PrimaryColor.bg" mt="4rem" pb="5rem">
        <form id="checkoutForm" method="POST" action="/charge"></form>
      </Box>
    </>
  );
};
