import { Box, Heading, Flex, Image } from "@chakra-ui/react";
import { useTranslation } from "../../hooks/useTranslation";
import HeartsContainer from "../common/HeartsContainer";

export const HeartsContactUs = () => {
  const { translations } = useTranslation("Contact");
  return (
    <Box my="6rem">
      <HeartsContainer>
        <Heading
          textDecor="underline"
          color="#003B71"
          as="h1"
          textAlign="center"
        >
          {translations.Contact}
        </Heading>
        <Flex
          flexWrap="wrap"
          mt="2rem"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box w={{ base: "100%", xl: "49%" }} textAlign="center">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3874.6904751661323!2d100.31983081528838!3d13.79752339994859!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e2938c2967d2e1%3A0x8c7062528ac85923!2sFaculty%20of%20Physical%20Therapy%20(MU)!5e0!3m2!1sen!2sth!4v1635494392935!5m2!1sen!2sth"
              width="100%"
              height="350"
              loading="lazy"
            />
          </Box>
          <Box w={{ base: "100%", xl: "49%" }} mt={{ base: "5", xl: "0" }}>
            <Flex w="100%" bg="PrimaryColor.bg" padding="2" alignItems="center">
              <Box w="20%">
                <Image
                  w="60%"
                  src="/images/icons/crossroads_23760.png"
                  alt="address"
                />
              </Box>
              <Box w="80%">
                ศูนย์กายภาพบำบัด (เชิงสะพานสมเด็จพระปิ่นเกล้า) คณะกายภาพบำบัด
                มหาวิทยาลัยมหิดล 198/2 ถนนสมเด็จพระปิ่นเกล้า แขวงบางยี่ขัน
                เขตบางพลัด กรุงเทพฯ 10700
              </Box>
            </Flex>
            <Flex
              w="100%"
              bg="PrimaryColor.bg"
              padding="2"
              alignItems="center"
              mt="4"
            >
              <Box w="20%">
                <Image
                  w="60%"
                  src="/images/icons/mail_23797.png"
                  alt="e-mail"
                />
              </Box>
              <Box w="80%">HeaRTS@gmail.com</Box>
            </Flex>
            <Flex
              w="100%"
              bg="PrimaryColor.bg"
              padding="2"
              alignItems="center"
              mt="4"
            >
              <Box w="20%">
                <Image
                  w="60%"
                  src="/images/icons/phone_23732.png"
                  alt="phone"
                />
              </Box>
              <Box w="80%">063-520-5151</Box>
            </Flex>
          </Box>
        </Flex>
      </HeartsContainer>
    </Box>
  );
};
