import { useCallback, useMemo } from "react";
import { useAppStore } from "../store";
import { ILocaleState, Language } from "../store/locale/@types";

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
    },
    [dispatch]
  );

  return useMemo(
    () => ({
      translations: Object.entries(locales)
        .filter(([key]) => keys.includes(key as K))
        .reduce((a, [k, v]) => ({ ...a, [k]: v }), {}) as Record<
        K | "currentLocale",
        V
      >,
      changeLocale,
    }),
    [changeLocale, keys, locales]
  );
};
