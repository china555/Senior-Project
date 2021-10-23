export type Language = "en" | "th";
export interface ILocaleState {
  currentLocale: Language;
  test: string;
}

export interface ILocaleEvent {
  "locale/changeLocale": Language;
}
