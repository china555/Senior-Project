import { Box } from "@chakra-ui/react";
import HeartsContainer from "../common/HeartsContainer";

const TopMenu = () => {
  return (
    <Box bg="PrimaryColor.900" color="white">
      <HeartsContainer>
        <Box display="flex" justifyContent="space-between" py="2">
          Eng | ไทย
        </Box>
      </HeartsContainer>
    </Box>
  );
};

export default TopMenu;
