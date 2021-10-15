import { Box } from "@chakra-ui/react";

interface MyProps {
  children?: React.ReactNode;
}

const MaxWidth: React.FunctionComponent<MyProps> = (props) => {
  return (
    <Box maxWidth={{ base: "100%", xl: "1200px" }} mx="auto">
      {props.children}
    </Box>
  );
};
export default MaxWidth;
