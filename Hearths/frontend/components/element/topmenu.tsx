import { Box } from "@chakra-ui/react";
import HeartsContainer from "../common/HeartsContainer";
import { Link } from "@chakra-ui/react";
export const HeartTopMenu = () => {
  return (
    <Box bg="PrimaryColor.900" color="white" fontWeight="medium">
      <HeartsContainer>
        <Box display="flex" justifyContent="space-between" py="2">
          <Box>
            <Link>Eng </Link>|<Link> ไทย</Link>
          </Box>
          <Box>
            <Link>SIGN UP </Link>|<Link> SIGN IN</Link>
          </Box>
        </Box>
      </HeartsContainer>
    </Box>
  );
};

HeartTopMenu.displayName = "HeartTopMenu";
