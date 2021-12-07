import { ILocaleState } from "./@types";
import { departmentENG, departmentTH } from "../common/department";
import { QuestionENG, QuestionTH } from "../common/Q&A";
import {
  PhysiotherapistENG,
  PhysiotherapistTH,
} from "../common/Physiotherapist";

export const enLocale: ILocaleState = {
  currentLocale: "en",
  test: "Test Eng",
  SignIn: "SIGN IN",
  SignUp: "SIGN UP",
  Home: "Home",
  Service: "Our Service",
  AboutUs: "About Us",
  Contact: "Contact Us",
  Appointment: "Make an appointment",
  MyAppointment: "My Appointment",
  RequestDocument: "Request Documet",
  VDOCallService: "Service",
  FAQ: "FAQ",
  OurTeam: "Our Team",
  DepartMentName: departmentENG,
  Question: QuestionENG,
  Physiotherapist: PhysiotherapistENG,
};

export const thLocale: ILocaleState = {
  currentLocale: "th",
  test: "ทดสอบไทย",
  SignIn: "เข้าสู่ระบบ",
  SignUp: "สมัครสมาชิก",
  Home: "หน้าหลัก",
  Service: "เซอร์วิส",
  AboutUs: "เกี่ยวกับพวกเรา",
  Contact: "ติดต่อเรา",
  Appointment: "นัดหมาย",
  MyAppointment: "นัดหมายของฉัน",
  RequestDocument: "ขอเอกสาร",
  VDOCallService: "บริการ",
  FAQ: "คำถามที่พบบ่อย",
  OurTeam: "ทีมของเรา",
  DepartMentName: departmentTH,
  Question: QuestionTH,
  Physiotherapist: PhysiotherapistTH,
};
