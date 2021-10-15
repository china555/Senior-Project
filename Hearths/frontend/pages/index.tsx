import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import { HeartInput } from "../components/element/Input";
import TopMenu from "../components/topmenu";

const Home: NextPage = () => {
  return (
    <Box>
      <TopMenu />
      <Box width={["100%", "30%"]} mx="auto">
        <HeartInput
          placeholder="User name"
          toolTipText="It is used for your identification and is used only 
in this process. It will not be used for anything else"
        />
      </Box>
    </Box>
  );
};

export default Home;
