export type Language = "en" | "th";
export interface ILocaleState {
  currentLocale: Language;
  test: string;
  SignIn: string;
  SignUp: string;
  Home: string;
  Service: string;
  AboutUs: string;
  Contact: string;
  Appointment: string;
}

export interface ILocaleEvent {
  "locale/changeLocale": Language;
}
