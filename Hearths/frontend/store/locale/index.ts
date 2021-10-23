import { StoreonModule } from "storeon";
import { ILocaleEvent, ILocaleState } from "./@types";
import { enLocale, thLocale } from "./constant";

export const localeModule: StoreonModule<ILocaleState, ILocaleEvent> = (
  store
) => {
  store.on("@init", () => enLocale);
  store.on("locale/changeLocale", (_, data) => {
    return data === "en" ? enLocale : thLocale;
  });
};
