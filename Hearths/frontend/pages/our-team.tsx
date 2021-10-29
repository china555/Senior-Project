import { Box, Heading, Text, Image } from "@chakra-ui/react";
import type { NextPage } from "next";
import HeartsContainer from "../components/common/HeartsContainer";
import { HeartsLayouts } from "../layouts/layout";
import { Grid } from "@chakra-ui/react";

const OurTeam: NextPage = () => {
  return (
    <HeartsLayouts>
      <HeartsContainer>
        <Heading color="#046483" as="h1" textAlign="center">
          Our Team
        </Heading>
        <Text px={{ base: 0, xl: "100px" }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industrys standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </Text>
        <Grid
          my="2rem"
          templateColumns="50% 50%"
          gap="50px 30px"
          justifyContent="center"
        >
          <Box w="70%" textAlign="center" mx="auto" bg="#F6F8F8" p="20px">
            <Heading as="h4" textAlign="center" size="md">
              Neurologic
            </Heading>
            <Box w="50%" mx="auto" mt="5">
              <Image w="100%" alt="Not Found" src="/images/icons/brain 1.png" />
            </Box>
          </Box>
          <Box w="70%" textAlign="center" mx="auto" bg="#F6F8F8" p="20px">
            <Heading as="h4" textAlign="center" size="md">
              Pediatric
            </Heading>
            <Box w="50%" mx="auto" mt="5">
              <Image w="100%" alt="Not Found" src="/images/icons/child 1.png" />
            </Box>
          </Box>
          <Box w="70%" textAlign="center" mx="auto" bg="#F6F8F8" p="20px">
            <Heading as="h4" textAlign="center" size="md">
              Orthopaedic
            </Heading>
            <Box w="50%" mx="auto" mt="5">
              <Image w="100%" alt="Not Found" src="/images/icons/joint 1.png" />
            </Box>
          </Box>
          <Box w="70%" textAlign="center" mx="auto" bg="#F6F8F8" p="20px">
            <Heading as="h4" textAlign="center" size="md">
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
