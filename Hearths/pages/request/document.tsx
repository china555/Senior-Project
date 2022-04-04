import { Box, Heading, Checkbox, Image, Flex, Button } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import HeartsContainer from "../../components/common/HeartsContainer";
import { useTranslation } from "../../hooks/useTranslation";
import { HeartsLayouts } from "../../layouts/layout";

const Document: NextPage = () => {
  const router = useRouter();
  const { translations } = useTranslation("Question");
  return (
    <HeartsLayouts>
      <HeartsContainer>
        <Heading color="#046483" as="h1" textAlign="center" my="5">
          Request Document
        </Heading>
        <Flex flexDirection="column" alignItems="center" py="1rem">
          <Box w={"25%"} my="1rem">
            <Checkbox>Medical Certificate</Checkbox>
            <Box w="30%" ml="3rem">
              <Image
                w="100%"
                src="/images/icons/medical-certificate 1.png"
                alt=""
              />
            </Box>
          </Box>
          <Box w={"25%"} my="1rem">
            <Checkbox>Referral Form</Checkbox>
            <Box w="30%" ml="3rem">
              <Image w="100%" src="/images/icons/Referral.png" alt="" />
            </Box>
          </Box>
          <Box w={"25%"} my="1rem">
            <Checkbox>Home Program/ Progression Note</Checkbox>
            <Box w="30%" ml="3rem">
              <Image w="100%" src="/images/icons/Home_Program.png" alt="" />
            </Box>
          </Box>
          <Button
            mt="1rem"
            bg="ButtonColor"
            borderRadius="35px"
            color="white"
            py="35px"
            px="40px"
            fontSize="1.4rem"
            onClick={() => {
              router.push("/");
            }}
          >
            Confirm
          </Button>
        </Flex>
      </HeartsContainer>
    </HeartsLayouts>
  );
};

export default Document;
