import type { AppProps } from "next/app";
import "../styles/Calendar.css";
import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../utils/";
import React from "react";
import { store, StoreonContext, useAppStore } from "../store";
import Head from "next/head";
import dynamic from "next/dynamic";

const RenderComponent = dynamic(import("../components/shared/RenderComponent"));

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StoreonContext.Provider value={store}>
      <ChakraProvider theme={theme}>
        <Head>
          <title>HeaRTS</title>
          <meta charSet="UTF-8" />
          <meta name="keywords" content="titla, meta, nextjs,HeaRTS,Hearts" />
          <meta property="og:image" content="/favicon.ico" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>
        <RenderComponent Component={Component} pageProps={pageProps} />
      </ChakraProvider>
    </StoreonContext.Provider>
  );
}

export default MyApp;
