import { useCallback, useMemo } from "react";
import { useAppStore } from "../store";
import { ILocaleState, Language } from "../store/locale/@types";

export const useTranslation = <
  T extends keyof ILocaleState,
  V extends ILocaleState[T]
>(
  keys: T[]
) => {
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
        .filter(([key]) => keys.includes(key as T))
        .reduce((a, [k, v]) => ({ ...a, [k]: v }), {}) as Record<T, V>,
      changeLocale,
    }),
    [changeLocale, keys, locales]
  );
};
