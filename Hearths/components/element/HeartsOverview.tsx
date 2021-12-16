import { Box, Heading, Flex, Image, Text, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useTranslation } from "../../hooks/useTranslation";

import HeartsContainer from "../common/HeartsContainer";
const iconOverall = [
  "/images/icons/appoint.png",
  "/images/icons/appoint.png",
  "/images/icons/appoint.png",
  "/images/icons/appoint.png",
];
export const HeartsOverview = () => {
  const { translations } = useTranslation("Overview", "TopicOverview");
  const router = useRouter();
  return (
    <HeartsContainer>
      <Box mt="6rem">
        <Heading color="#003B71" as="h1" textAlign="center" pt="5">
          {translations.TopicOverview}
        </Heading>
        <Box display="flex" flexWrap="wrap" justifyContent="center">
          {/* @ts-ignore: Unreachable code error */}
          {translations.Overview.map((ele, index) => (
            <Box w={{ base: "50%", xl: "25%" }} key={`index${index}`}>
              <Box mx="auto" w={"30%"}>
                <Image
                  w="100%"
                  alt="something"
                  src="/images/icons/appoint.png"
                />
              </Box>
              <Box textAlign="center">
                <Heading color="#003B71" fontSize="20px">
                  {ele.topic}
                </Heading>
                {ele.detail.map((ele: string, index: number) => (
                  <Box key={index}>{ele}</Box>
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </HeartsContainer>
  );
};
