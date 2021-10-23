import { Box } from "@chakra-ui/react";
import { HeartsFooter } from "../components/element/footer";
import { HeartsNavbar } from "../components/element/narbar";
import { HeartsTopMenu } from "../components/element/topmenu";

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
