import { useCallback, useMemo } from "react";
import { useAppStore } from "../store";
import { ILocaleState, Language } from "../store/locale/@types";

export const useTranslation = (keys: (keyof ILocaleState)[]) => {
  const { dispatch, ...locales } = useAppStore("currentLocale", ...keys);
  const changeLocale = useCallback(
    (language: Language) => {
      dispatch("locale/changeLocale", language);
    },
    [dispatch]
  );

  return useMemo(
    () => ({
      translations: Object.entries(locales)
        .filter(([key]) => keys.includes(key as keyof ILocaleState))
        .reduce((a, [k, v]) => ({ ...a, [k]: v }), {}) as Record<
        keyof ILocaleState,
        string
      >,
      changeLocale,
    }),
    [changeLocale, keys, locales]
  );
};
