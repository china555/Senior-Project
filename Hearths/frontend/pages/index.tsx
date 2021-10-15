import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import TopMenu from "../components/topmenu";

const Home: NextPage = () => {
  return (
    <Box>
      <TopMenu />
    </Box>
  );
};

export default Home;
