import { Box, Image } from "@chakra-ui/react";
import HeartsContainer from "../common/HeartsContainer";

export const HeartsNavbar = () => {
  return (
    <HeartsContainer>
      <Box display="flex">
        <Box w="20">
          <Image w="100%" alt="sorry" src="/images/logo/hearts_logo.png" />
        </Box>
      </Box>
    </HeartsContainer>
  );
};

HeartsNavbar.displayName = "HeartsNavbar";
