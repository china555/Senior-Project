import { Box, Image, Button } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useState } from "react";

interface MyProps {
  children?: React.ReactNode;
  img: string;
  text: string;
}

export const HeartsMordal: React.FunctionComponent<MyProps> = (props) => {
  const [isopen, setisopen] = useState(false);
  const { img, text } = props;
  return (
    <Box
      style={{
        display: isopen ? "flex" : "none",
      }}
      position="fixed"
      m="auto"
      top="0"
      bg="rgba(255,255,255, 0.3)"
      w="100%"
      h="100%"
      zIndex="5"
      overflow="auto"
      transition="all 0.3s linear"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        w={{ base: "60%", xl: "40%" }}
        bg="white"
        borderRadius="20px"
        border="1px solid black"
        padding="20px"
        textAlign="center"
      >
        <Box
          position="relative"
          top="0"
          float="right"
          cursor="pointer"
          onClick={() => setisopen(!isopen)}
        >
          <CloseIcon />
        </Box>
        <Box w="100px" mx="auto">
          <Image w="100%" alt="NOt Found" src={img} />
        </Box>
        <Box>{text}</Box>
        <Button
          my="1rem"
          bg="ButtonColor"
          borderRadius="35px"
          color="white"
          fontSize="1.2rem"
          w="40%"
          onClick={() => setisopen(!isopen)}
        >
          OK
        </Button>
      </Box>
    </Box>
  );
};
