import type { AppProps } from "next/app";
import "../styles/Calendar.css";
import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../utils/";
import React from "react";
import { store, StoreonContext, useAppStore } from "../store";

import dynamic from "next/dynamic";

const RenderComponent = dynamic(import("../components/shared/RenderComponent"));

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StoreonContext.Provider value={store}>
      <ChakraProvider theme={theme}>
        <RenderComponent Component={Component} pageProps={pageProps} />
      </ChakraProvider>
    </StoreonContext.Provider>
  );
}

export default MyApp;
