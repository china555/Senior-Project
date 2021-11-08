export type Language = "en" | "th";
export type QuestionAndAnswer = {
  Question: string;
  Answer: string;
};
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
  MyAppointment: string;
  RequestDocument: string;
  VDOCallService: string;
  FAQ: string;
  OurTeam: string;
  Question: QuestionAndAnswer[];
}

export interface ILocaleEvent {
  "locale/changeLocale": Language;
}
