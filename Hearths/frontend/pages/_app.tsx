import "../styles/globals.css";
import type { AppProps } from "next/app";
import NextApp, { AppInitialProps } from "next/app";

import { ChakraProvider } from "@chakra-ui/react";
import { appWithTranslation } from "next-i18next";
import { Router } from "next/dist/client/router";
import { AppContextType } from "next/dist/shared/lib/utils";
import { theme } from "../utils/";
import { useTranslation } from "next-i18next";
import { useEffect } from "react";
function MyApp({ Component, pageProps }: AppProps) {
  const { i18n } = useTranslation();
  useEffect(() => {
    if (typeof window !== undefined) {
      localStorage.setItem("language", i18n.language);
    }
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
MyApp.getInitialProps = async (appContext: AppContextType<Router>) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps: AppInitialProps = await NextApp.getInitialProps(appContext);

  return { ...appProps };
};

export default appWithTranslation(MyApp);
