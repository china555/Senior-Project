import { useCallback, useMemo } from "react";
import { useAppStore } from "../store";
import { ILocaleState, Language } from "../store/locale/@types";
import { isBrowser } from "../utils/isBrowser";

export const useTranslation = <
  K extends keyof Omit<ILocaleState, "currentLocale">,
  V extends ILocaleState[K]
>(
  ...keys: K[]
) => {
  const { dispatch, ...locales } = useAppStore("currentLocale", ...keys);
  const changeLocale = useCallback(
    (language: Language) => {
      dispatch("locale/changeLocale", language);

      if (!isBrowser) return;
      localStorage.setItem("language", language);
    },
    [dispatch]
  );

  return useMemo(
    () => ({
      translations: Object.entries(locales)
        .filter(([key]) => ["currentLocale", ...keys].includes(key as K))
        .reduce((a, [k, v]) => ({ ...a, [k]: v }), {}) as Record<
        K | "currentLocale",
        V
      >,
      changeLocale,
    }),
    [changeLocale, keys, locales]
  );
};
