import { Box } from "@chakra-ui/react";
import { HeartsFooter } from "../components/element/HeartsFooter";
import { HeartsNavbar } from "../components/element/HeartsNarbar";
import { HeartsTopMenu } from "../components/element/HeartsTopmenu";

interface Props {
  children?: React.ReactNode;
}

export const HeartsLayouts: React.FunctionComponent<Props> = (props) => {
  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <Box flex="1 0 auto">
        <HeartsTopMenu />
        <HeartsNavbar />
        {props.children}
      </Box>
      <Box flexShrink={0}>
        <HeartsFooter />
      </Box>
    </Box>
  );
};
