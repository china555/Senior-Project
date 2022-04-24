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
  Confirm: string;
  Close: string;
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
  IDCard: string;
  email: string;
  password: string;
  address1: string;
  address2: string;
  selectspeacialty: string;
  Name: string;
  PTName: string;
  selectedDate: string;
  appointmentnote: string;
  yourAppoint: string;
  on: string;
  Cancel: string;
  paymentFee: string;
  NoteFee: string;
  NoteFee1: string;
  NoteFee2: string;
  Error: string;
  successAppoint: string;
  submitFail: string;
  clickpleaseUploadPayment: string;
  clickappointmentcanceled: string;
  clickconfirm: string;
  accountName: string;
  accountNo: string;
  welcome: string;
  slogan: string;
  Date: string;
  Time: string;
  meetingLink: string;
  statusmeeting: string;
  PENDING: string;
  CONFIRMED: string;
  REJECT: string;
  LINK: string;
  OurDepartment: string;
  Profile: string;
  accept: string;
  forgetpass: string;
  registerWarning: string;
  newsletter: string;
  medical: string;
  homepro: string;
  refferral: string;
  selectedDateTime: string;
  selectspeacialty1: string;
  hn: string;
  patientName: string;
  selectPaymentMethod: string;
  payByCredit: string;
  payByQR: string;
}

export interface ILocaleEvent {
  "locale/changeLocale": Language;
}
