import "../styles/globals.css";
import type { AppProps } from "next/app";

import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../utils/";
import React, { useEffect } from "react";
import { store, StoreonContext, useAppStore } from "../store";
import { isBrowser } from "../utils/isBrowser";
import { Language } from "../store/locale/@types";

function RenderComponent({
  Component,
  pageProps,
}: Pick<AppProps, "Component" | "pageProps">) {
  const { dispatch } = useAppStore();
  useEffect(() => {
    if (!isBrowser) return;
    const language = localStorage.getItem("language") as Language;
    if (!language) return;
    dispatch("locale/changeLocale", language);
  }, []);

  return <Component {...pageProps} />;
}

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
