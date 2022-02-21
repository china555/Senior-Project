import { Box, Heading, Flex, Image, Text, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useTranslation } from "../../hooks/useTranslation";

import HeartsContainer from "../common/HeartsContainer";
const iconOverView = [
  "/images/Overview/solidarity.png",
  "/images/Overview/people.png",
  "/images/Overview/knock.png",
  "/images/Overview/badge.png",
];
export const HeartsOverview = () => {
  const { translations } = useTranslation("Overview", "TopicOverview");
  const router = useRouter();
  return (
    <Box bg="PrimaryColor.bg" mt="4rem" pb="5rem">
      <HeartsContainer>
        <Heading color="#003B71" as="h1" textAlign="center" py="3rem">
          {translations.TopicOverview}
        </Heading>
        <Box display="flex" flexWrap="wrap" justifyContent="center">
          {/* @ts-ignore: Unreachable code error */}
          {translations.Overview.map((ele, index) => (
            <Box w={{ base: "50%", xl: "25%" }} key={`index${index}`}>
              <Box mx="auto" w={"30%"}>
                <Image w="100%" alt="something" src={iconOverView[index]} />
              </Box>
              <Box mt="5" textAlign="center">
                <Heading color="#003B71" fontSize="20px">
                  {index === 0 ? (
                    <Box>
                      {ele.topic.split(", ")[0]}
                      <br />
                      {ele.topic.split(", ")[1]}
                    </Box>
                  ) : (
                    <Box>{ele.topic}</Box>
                  )}
                </Heading>
                {ele.detail.map((ele: string, index: number) => (
                  <Box key={`number-${index}`}>{ele}</Box>
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      </HeartsContainer>
    </Box>
  );
};
