import "../styles/globals.css";
import type { AppProps } from "next/app";

import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../utils/";
import React from "react";
import { store, StoreonContext } from "../store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StoreonContext.Provider value={store}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </StoreonContext.Provider>
  );
}

export default MyApp;
