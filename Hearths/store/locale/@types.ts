export type Language = "en" | "th";
export type QuestionAndAnswer = {
  Question: string;
  Answer: string;
};
export interface IPhysiotherapist {
  name: string;
  specialty: string[];
  img: string;
}
export type DepartMent = {
  OccupationalTherapy: string;
  MusculoSkeletalSystem: string;
  NeurologicalSystem: string;
  Pediatric: string;
  Scoliosis: string;
  WomenHealth: string;
  Community: string;
};
export type Physiotherapist = {
  PhysiotherapistOT: IPhysiotherapist[];
  PhysiotherapistMS: IPhysiotherapist[];
  PhysiotherapistNS: IPhysiotherapist[];
  PhysiotherapistPediatric: IPhysiotherapist[];
  PhysiotherapistScoliosis: IPhysiotherapist[];
  PhysiotherapistWomen: IPhysiotherapist[];
  PhysiotherapistCommunity: IPhysiotherapist[];
};

export type Overview = {
  topic: string;
  detail: string[];
};
export interface ILocaleState {
  currentLocale: Language;
  test: string;
  SignIn: string;
  SignUp: string;
  SignOut: string;
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
  DepartMentName: any;
  Physiotherapist: any;
  Question: QuestionAndAnswer[];
  Overview: Overview[];
  TopicOverview: string;
  ErrorMessageSelectedTime: string;
}

export interface ILocaleEvent {
  "locale/changeLocale": Language;
}
