export type Language = "en" | "th";
export type QuestionAndAnswer = {
  Question: string;
  Answer: string;
};
type DepartMent = {
  OccupationalTherapy: string;
  MusculoSkeletalSystem: string;
  NeurologicalSystem: string;
  Pediatric: string;
  Scoliosis: string;
  WomenHealth: string;
  Community: string;
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
  DepartMentName: DepartMent;

  Question: QuestionAndAnswer[];
}

export interface ILocaleEvent {
  "locale/changeLocale": Language;
}
