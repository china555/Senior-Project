import { AppProps } from "next/app";
import { useEffect } from "react";
import { useAppStore } from "../../store";
import { Language } from "../../store/locale/@types";
import { isBrowser } from "../../utils/isBrowser";

function RenderComponent({
  Component,
  pageProps,
}: Pick<AppProps, "Component" | "pageProps">) {
  const { dispatch } = useAppStore();
  useEffect(() => {
    const language = localStorage.getItem("language") as Language;
    if (!language) return;
    dispatch("locale/changeLocale", language);
  }, []);

  return <Component {...pageProps} />;
}

export default RenderComponent;
