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
  TopicOverview: "Overview",
  Overview: [
    {
      topic: "Tele-Physical therapy, Tele-occupational therapy",
      detail: [
        "Less chance of being transmitted by an infectious disease",
        "Less transportation time and costs",
        "Continuity of care",
        "Access to specialists",
      ],
    },
    {
      topic: "Service mind",
      detail: [
        "Being service-minded to serve you in a manner that will elicit the best care and less burden of caregivers",
      ],
    },
    {
      topic: "Easy access, Anytime, Anywhere",
      detail: [
        "Tele-healthcare delivery service by your specialized physical therapist/ occupational therapist. This will allow you to have an access anywhere, anytime.",
      ],
    },
    {
      topic: "Designed just for you",
      detail: [
        "Tailor-made service delivery to make it : better quality of life, the best for you and your family",
      ],
    },
  ],
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
  TopicOverview: "ภาพรวม",
  Overview: [
    {
      topic: "กายภาพบำบัด, กิจกรรมบำบัดทางไกล",
      detail: [
        "ลดโอกาสการติดเชื้อ",
        "ลดเวลาการเดินทางและค่าใช้จ่าย",
        "ลดภาระการดูแล",
        "เกิดการดูแลอย่างต่อเนื่อง",
        "เข้าถึงการบริการจากผู้เชี่ยวชาญ",
        "คุณภาพชีวิตดีขึ้น",
      ],
    },
    {
      topic: "บริการด้วยใจ",
      detail: ["บริการด้วยใจเพื่อการดูแลที่ดีที่สุดสำหรับคุณ"],
    },
    {
      topic: "เข้าถึงง่าย ทุกที่ ทุกเวลา",
      detail: [
        "การดูแลทางไกลด้วยนักกายภาพบำบัด หรือนักกิจกรรมบำบัดที่เชี่ยวชาญของคุณ จะทำให้คุณเข้าถึงบริการได้ง่าย ทุกที่ ทุกเวลา",
      ],
    },
    {
      topic: "ออกแบบมาเฉพาะคุณ",
      detail: [
        "การดูแลของเราได้ออกแบบมาเฉพาะคุณ เพื่อส่งมอบสิ่งที่ดีที่สุดสำหรับคุณและครอบครัว",
      ],
    },
  ],
};
