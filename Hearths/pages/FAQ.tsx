import {
  Box,
  Heading,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import HeartsContainer from "../components/common/HeartsContainer";
import { useTranslation } from "../hooks/useTranslation";
import { HeartsLayouts } from "../layouts/layout";
import { ChevronRightIcon, ChevronDownIcon } from "@chakra-ui/icons";
const FAQ: NextPage = () => {
  const { translations } = useTranslation("Question");
  return (
    <HeartsLayouts>
      <HeartsContainer>
        <Heading color="#046483" as="h1" textAlign="center" my="5">
          FAQ
        </Heading>
        <Accordion allowToggle>
          {translations.Question.map(({ Question, Answer }, index) => {
            return (
              <AccordionItem key={index}>
                {({ isExpanded }) => (
                  <>
                    <AccordionButton>
                      {isExpanded ? (
                        <ChevronDownIcon
                          fontSize={{ base: "24px", xl: "30px" }}
                        />
                      ) : (
                        <ChevronRightIcon
                          fontSize={{ base: "24px", xl: "30px" }}
                        />
                      )}
                      <Box
                        flex="1"
                        textAlign="left"
                        fontWeight="bold"
                        fontSize="1.2rem"
                      >
                        {Question}
                      </Box>
                    </AccordionButton>
                    <AccordionPanel pb={4} fontSize="1.1rem">
                      {Answer}
                    </AccordionPanel>
                  </>
                )}
              </AccordionItem>
            );
          })}
        </Accordion>
      </HeartsContainer>
    </HeartsLayouts>
  );
};

export default FAQ;
