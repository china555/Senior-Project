import { Box } from "@chakra-ui/react";

interface MyProps {
  children?: React.ReactNode;
}

const HeartsContainer: React.FunctionComponent<MyProps> = (props) => {
  return (
    <Box maxWidth={{ base: "100%", xl: "1200px" }} mx="auto" px="2">
      {props.children}
    </Box>
  );
};
export default HeartsContainer;
