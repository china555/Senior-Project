import { Box, Heading, Flex, Image, Link } from "@chakra-ui/react";
import { useTranslation } from "../../hooks/useTranslation";
import HeartsContainer from "../common/HeartsContainer";

export const HeartsContactUs = () => {
  const { translations } = useTranslation("Contact", "address1", "address2");
  return (
    <Box pb="4rem" mt="4rem" bg="PrimaryColor.bg">
      <HeartsContainer>
        <Heading pt="3rem" color="#003B71" as="h1" textAlign="center">
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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.252403971038!2d100.48785971409811!3d13.763646700728843!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e2997408547b8b%3A0x2deeab2f4c6319b4!2z4Lio4Li54LiZ4Lii4LmM4LiB4Liy4Lii4Lig4Liy4Lie4Lia4Liz4Lia4Lix4LiUIOC4oeC4q-C4suC4p-C4tOC4l-C4ouC4suC4peC4seC4ouC4oeC4q-C4tOC4lOC4pQ!5e0!3m2!1sen!2sth!4v1639639657258!5m2!1sen!2sth"
              width="100%"
              height="350"
              loading="lazy"
            ></iframe>
          </Box>
          <Box w={{ base: "100%", xl: "49%" }} mt={{ base: "5", xl: "0" }}>
            <Flex w="100%" bg="white" padding="2" alignItems="center">
              <Box w="20%">
                <Image
                  w="60%"
                  src="/images/icons/crossroads_23760.png"
                  alt="address"
                />
              </Box>
              <Box w="85%">
                <Link
                  target="_blank"
                  href="https://www.google.com/maps/place/Faculty+of+Physical+Therapy+(MU)/@13.797518,100.32202,16z/data=!4m12!1m6!3m5!1s0x0:0x13228aa5ea3262e!2sFaculty+of+Medical+Technology+(MU)!8m2!3d13.7985556!4d100.32309!3m4!1s0x30e2938c2967d2e1:0x8c7062528ac85923!8m2!3d13.7975182!4d100.3220195?hl=en"
                  wordBreak={"break-word"}
                >
                  {translations.address1}
                </Link>
              </Box>
            </Flex>
            <Flex w="100%" bg="white" padding="2" alignItems="center" mt="4">
              <Box w="20%">
                <Image
                  w="60%"
                  src="/images/icons/crossroads_23760.png"
                  alt="address"
                />
              </Box>
              <Box w="85%">
                <Link
                  target="_blank"
                  href="https://www.google.com/maps/place/%E0%B8%A8%E0%B8%B9%E0%B8%99%E0%B8%A2%E0%B9%8C%E0%B8%81%E0%B8%B2%E0%B8%A2%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%9A%E0%B8%B3%E0%B8%9A%E0%B8%B1%E0%B8%94+%E0%B8%A1%E0%B8%AB%E0%B8%B2%E0%B8%A7%E0%B8%B4%E0%B8%97%E0%B8%A2%E0%B8%B2%E0%B8%A5%E0%B8%B1%E0%B8%A2%E0%B8%A1%E0%B8%AB%E0%B8%B4%E0%B8%94%E0%B8%A5/@13.7636467,100.4878597,17z/data=!3m1!4b1!4m5!3m4!1s0x30e2997408547b8b:0x2deeab2f4c6319b4!8m2!3d13.7636415!4d100.4900484?hl=en"
                  wordBreak={"break-word"}
                >
                  {translations.address2}
                </Link>
              </Box>
            </Flex>
            <Flex w="100%" bg="white" padding="2" alignItems="center" mt="4">
              <Box w="20%">
                <Image
                  w="60%"
                  src="/images/icons/mail_23797.png"
                  alt="e-mail"
                />
              </Box>
              <Box w="80%">
                <Link href="mailto:HeaRTS@mahidol.ac.th">
                  HeaRTS@mahidol.ac.th
                </Link>
              </Box>
            </Flex>
            <Flex w="100%" bg="white" padding="2" alignItems="center" mt="4">
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
