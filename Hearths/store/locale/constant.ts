import { ILocaleState } from "./@types";
import { departmentENG, departmentTH } from "../common/department";
import { QuestionENG, QuestionTH } from "../common/Q&A";
import {
  PhysiotherapistENG,
  PhysiotherapistTH,
} from "../common/Physiotherapist";

export const enLocale: ILocaleState = {
  Skip: "Skip",
  currentLocale: "en",
  test: "Test Eng",
  SignIn: "SIGN IN",
  SignUp: "SIGN UP",
  SignOut: "SIGN OUT",
  Home: "Home",
  Service: "Our Service",
  AboutUs: "About Us",
  Contact: "Contact Us",
  Confirm: "Confirm",
  Close: "Close",
  Appointment: "Make an appointment",
  MyAppointment: "My Appointment",
  RequestDocument: "Request Document",
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
  ErrorMessageSelectedTime: "Please select time for appointment",
  IDCard: "ID Card Number",
  email: "Email",
  password: "Password",
  address1: `Physical Therapy Center Faculty of Physical Therapy, Mahidol University 999 Phutthamonthon Sai 4 Rd, Salaya, Phutthamonthon District, Nakhon Pathom 73170`,
  address2: `Physical Therapy Center (The foot of Somdejphrapinklao Bridge) Faculty of Physical Therapy, Mahidol University 198/2 Somdejphrapinklao Rd, Bang Yi Khan Subdistrict, Bang Phlat District, Bangkok 10700`,
  selectspeacialty: `Select Specialty`,
  selectspeacialty1: `Select Specialty`,
  Name: "Select Physical Therapist",
  PTName: "Select Physical Therapist Name",
  selectedDate: "Select Date",
  appointmentnote: "*Note: You can skip step 1 and 2, if you do not know.",
  yourAppoint: "Your appointment is",
  on: "on",
  Cancel: "Cancel",
  paymentFee: "Sign Up Fee",
  NoteFee: "*Note:",
  NoteFee1: `You cannot skip this process. If you change or
  close this page, this process will be canceled.`,
  NoteFee2: `You must upload the receipt.`,
  Error: `Please Try again Later`,
  successAppoint: `Appointment Successful`,
  submitFail: `Submit Fail`,
  clickappointmentcanceled: `If you click confirm your process of appointment will be canceled`,
  clickconfirm: `Please wait for payment confirmation`,
  clickpleaseUploadPayment: `Please upload payment recipte before click confirm button`,
  accountName: "Account Name",
  accountNo: "Account No. ",
  welcome: "Welcome To",
  slogan: `Tele-Physical therapy, Tele-occupational therapy, service mind, easy
  access, anytime, anywhere, designed just for you`,
  Date: "Date",
  Time: "Time",
  meetingLink: "Meeting Link",
  statusmeeting: "Appointment Status",
  CONFIRMED: "CONFIRMED",
  PENDING: "PENDING",
  REJECT: "REJECTED",
  LINK: "LINK",
  OurDepartment: "Our Department",
  Profile: "Profile",
  newsletter:
    "I would like to receive your newsletter and other promotional information.",
  forgetpass: "Forgot your password?",
  registerWarning: "*Please read carefully. Click accept before click Sign Up",
  accept: "Accept",
  homepro: "Home Program/ Progression Note",
  medical: "Medical Certificate",
  refferral: "Referral Form",
  selectedDateTime: "Please select date & time",
  hn: "Hospital Number",
  patientName: "Name",
  selectPaymentMethod: "Select Payment Methods",
  payByCredit: "PAY BY CREDIT CARD",
  payByQR: "PAY BY QR CODE",
};

export const thLocale: ILocaleState = {
  Skip: "ข้าม",
  currentLocale: "th",
  test: "ทดสอบไทย",
  SignIn: "เข้าสู่ระบบ",
  SignUp: "สมัครสมาชิก",
  SignOut: "ออกจากระบบ",
  Home: "หน้าหลัก",
  Service: "เซอร์วิส",
  AboutUs: "เกี่ยวกับพวกเรา",
  Confirm: "ยืนยัน",
  Close: "ปิด",
  Contact: "ติดต่อเรา",
  Appointment: "ทำการนัดหมาย",
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
        "เกิดการดูแลอย่างต่อเนื่อง",
        "เข้าถึงการบริการจากผู้เชี่ยวชาญ",
      ],
    },
    {
      topic: "บริการด้วยใจ",
      detail: ["บริการด้วยใจเพื่อการดูแลที่ดีที่สุดสำหรับคุณ", "ลดภาระการดูแล"],
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
        "คุณภาพชีวิตดีขึ้น",
      ],
    },
  ],
  ErrorMessageSelectedTime: "กรุณาเลือกวันและเวลาในการจอง",
  IDCard: "หมายเลขบัตรประจำตัวประชาชน",
  email: "อีเมล",
  password: "รหัสผ่าน",
  address1: `ศูนย์กายภาพบำบัด คณะกายภาพบำบัด มหาวิทยาลัยมหิดล 999 ถนนพุทธมณฑลสาย 4 ตำบล ศาลายา อำเภอพุทธมณฑล นครปฐม 73170`,
  address2: `ศูนย์กายภาพบำบัด (เชิงสะพานสมเด็จพระปิ่นเกล้า) คณะกายภาพบำบัด มหาวิทยาลัยมหิดล 198/2 ถนนสมเด็จพระปิ่นเกล้า แขวงบางยี่ขัน เขตบางพลัด กรุงเทพฯ 10700`,
  selectspeacialty: `เลือก แผนก`,
  selectspeacialty1: `เลือกแผนกที่ต้องการ`,
  Name: "เลือก นักกายภาพบำบัด",
  PTName: "เลือกชื่อนักกายภาพบำบัดที่ต้องการ",
  selectedDate: "เลือกวัน",
  appointmentnote:
    "*คำแนะนำ: หากไม่ทราบ แผนก หรือ นักกายภาพบำบัด สามารถข้ามขั้นตอน 1 และ 2 ได้",
  yourAppoint: "วันนัดหมายของคุณคือ",
  on: "วันที่",
  Cancel: "ยกเลิก",
  paymentFee: "ชำระเงิน",
  NoteFee: "*คำแนะนำ:",
  NoteFee1: `คุณไม่สามารถข้ามขั้นตอนนี้ได้ ถ้าคุรต้องการเปลี่ยนหรือออกจากหน้านี้แต่ขั้นตอนนี้จะถูกยกเลิก`,
  NoteFee2: `คุณต้องอัพโหลดสลิป`,
  Error: `โปรดลองใหม่อีกครั้ง`,
  successAppoint: `ทำการนัดหมายสำเร็จ`,
  submitFail: `ไม่สำเร็จ`,
  clickappointmentcanceled: `ถ้าคุณกดยืนยัน การนัดหมายครั้งนี้จะถูกยกเลิก`,
  clickconfirm: `โปรดรอการยืนยันการตรวจสอบชำระเงิน`,
  clickpleaseUploadPayment: `โปรดอัพโหลดใบเสร็จการชำระเงินก่อนกดยืนยัน`,
  accountName: "ชื่อบัญชี",
  accountNo: "เลขที่บัญชี",
  welcome: "ยินดีต้อนรับเข้าสู่",
  slogan: `กายภาพบำบัดกิจกรรมบำบัดทางไกล บริการด้วยใจ เข้าถึงง่าย ทุกที่ ทุกเวลา ออกแบบมาเฉพาะคุณ`,
  Date: "วัน",
  Time: "เวลา",
  meetingLink: "ลิงค์การนัดหมาย",
  statusmeeting: "สถานะการนัดหมาย",
  CONFIRMED: "ยืนยันแล้ว",
  PENDING: "รอการยืนยัน",
  REJECT: "ยกเลิกแล้ว",
  LINK: "ลิงค์",
  OurDepartment: "แผนกของเรา",
  Profile: "โปรไฟล์",
  newsletter: "ฉันยอมรับที่จะรับข่าวสารและข้อมูลต่างๆ",
  forgetpass: "ลืมรหัสผ่าน?",
  registerWarning: "*โปรดอ่านอย่างละเอียดก่อนกดลงทะเบียน",
  accept: "ตกลง",
  homepro: "ใบชี้แจงการบำบัดที่บ้าน / บันทึกอาการคนไข้",
  medical: "ใบรับรองแพทย์",
  refferral: "ใบส่งตัว",
  selectedDateTime: "โปรดเลือกวันและเวลา",
  hn: "เลขบัตรประจำตัวผู้ป่วย",
  patientName: "ชื่อ",
  selectPaymentMethod: "เลือกวิธีชำระเงิน",
  payByCredit: "จ่ายผ่านบัตรเครดิต",
  payByQR: "จ่ายผ่านสแกนคิวอาร์โค๊ด",
};
