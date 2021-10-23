import { useCallback, useMemo } from "react";
import { useAppStore } from "../store";
import { ILocaleState, Language } from "../store/locale/@types";

export const useTranslation = <
  K extends keyof ILocaleState,
  V extends ILocaleState[K]
>(
  keys: K[]
) => {
  const { dispatch, ...locales } = useAppStore("currentLocale", ...keys);
  const changeLocale = useCallback(
    (language: Language) => {
      dispatch("locale/changeLocale", language);
    },
    [dispatch]
  );

  return useMemo(() => {
    console.log("1", locales);
    console.log("2", Object.entries(locales));
    console.log(
      "3",
      Object.entries(locales).filter(([key]) => keys.includes(key as K))
    );
    console.log(
      "4",
      Object.entries(locales)
        .filter(([key]) => keys.includes(key as K))
        .reduce((a, [k, v]) => ({ ...a, [k]: v }), {}) as Record<K, V>
    );
    return {
      translations: Object.entries(locales)
        .filter(([key]) => keys.includes(key as K))
        .reduce((a, [k, v]) => ({ ...a, [k]: v }), {}) as Record<K, V>,
      changeLocale,
    };
  }, [changeLocale, keys, locales]);
};
