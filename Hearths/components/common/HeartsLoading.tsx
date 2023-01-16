import { Spinner, Box } from "@chakra-ui/react";

interface MyProps {
  children?: React.ReactNode;
}

const HeartsLoading: React.FunctionComponent<MyProps> = (props) => {
  return (
    <Box mx={"auto"} w="100%" textAlign={"center"}>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="lg"
      />
    </Box>
  );
};
export default HeartsLoading;
