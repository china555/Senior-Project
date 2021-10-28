import { Box } from "@chakra-ui/react";

export const HeartsMordal = () => {
  return (
    <Box
      position="fixed"
      m="auto"
      top="0"
      bg="rgba(255,255,255, 0.5)"
      w="100%"
      h="100%"
      zIndex="5"
      style={{ filter: "blur(1px)" }}
      overflow="auto"
      transition="all 0.3s linear"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box>adwawd</Box>
    </Box>
  );
};
