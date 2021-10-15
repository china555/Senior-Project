import "../styles/globals.css";
import type { AppProps } from "next/app";
import NextApp, { AppInitialProps } from "next/app";

import { ChakraProvider } from "@chakra-ui/react";
import { appWithTranslation } from "next-i18next";
import { Router } from "next/dist/client/router";
import { AppContextType } from "next/dist/shared/lib/utils";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />;
    </ChakraProvider>
  );
}
MyApp.getInitialProps = async (appContext: AppContextType<Router>) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps: AppInitialProps = await NextApp.getInitialProps(appContext);

  return { ...appProps };
};

export default appWithTranslation(MyApp);
