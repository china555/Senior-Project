import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import { HeartInput } from "../components/element/Input";
import { HeartsNavbar } from "../components/element/narbar";
import { HeartsTopMenu } from "../components/element/topmenu";

const Home: NextPage = () => {
  return (
    <Box>
      <HeartsTopMenu />
      <HeartsNavbar />
      {/* <Box width={["100%", "30%"]} mx="auto">
        <HeartInput
          placeholder="User name"
          toolTipText="It is used for your identification and is used only 
in this process. It will not be used for anything else"
        />
      </Box> */}
    </Box>
  );
};

export default Home;
