import { Box, Heading, Text, Image } from "@chakra-ui/react";
import type { NextPage } from "next";
import HeartsContainer from "../components/common/HeartsContainer";
import { HeartsLayouts } from "../layouts/layout";
import { Grid } from "@chakra-ui/react";
import ReactPlayer from "react-player";

const OurTeam: NextPage = () => {
  return (
    <HeartsLayouts>
      <HeartsContainer>
        <Heading color="#046483" as="h1" textAlign="center">
          Our Team
        </Heading>
        <Box
          mt="2rem"
          textAlign="center"
          mx="auto"
          w={{ base: "100%", xl: "50%" }}
          h={{ base: "320px", xl: "400px" }}
        >
          <iframe
            src="https://drive.google.com/file/d/1hWJ-3clKQ2NgZz0emJuyKF5vUdZN2HaN/preview"
            width="100%"
            height="100%"
            allow="autoplay"
            allowFullScreen
          />
        </Box>
        <Grid
          my="2rem"
          templateColumns={{ base: "100%", xl: "50% 50%" }}
          gap="50px 30px"
          justifyContent="center"
        >
          <Box w="70%" textAlign="center" mx="auto" bg="#F6F8F8" p="20px">
            <Heading as="h4" textAlign="center" size="lg">
              Neurologic
            </Heading>
            <Box w="50%" mx="auto" mt="5">
              <Image w="100%" alt="Not Found" src="/images/icons/brain 1.png" />
            </Box>
          </Box>
          <Box w="70%" textAlign="center" mx="auto" bg="#F6F8F8" p="20px">
            <Heading as="h4" textAlign="center" size="lg">
              Pediatric
            </Heading>
            <Box w="50%" mx="auto" mt="5">
              <Image w="100%" alt="Not Found" src="/images/icons/child 1.png" />
            </Box>
          </Box>
          <Box w="70%" textAlign="center" mx="auto" bg="#F6F8F8" p="20px">
            <Heading as="h4" textAlign="center" size="lg">
              Orthopaedic
            </Heading>
            <Box w="50%" mx="auto" mt="5">
              <Image w="100%" alt="Not Found" src="/images/icons/joint 1.png" />
            </Box>
          </Box>
          <Box w="70%" textAlign="center" mx="auto" bg="#F6F8F8" p="20px">
            <Heading as="h4" textAlign="center" size="lg">
              Occupational Therapy
            </Heading>
            <Box w="50%" mx="auto" mt="5">
              <Image
                w="100%"
                alt="Not Found"
                src="/images/icons/physical 1.png"
              />
            </Box>
          </Box>
        </Grid>
      </HeartsContainer>
    </HeartsLayouts>
  );
};

export default OurTeam;
