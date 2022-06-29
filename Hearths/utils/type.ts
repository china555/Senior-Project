export interface IAppointment {
  appoint_datetime: Date;
  event_id: number;
  meeting_link: string;
  patientPrefix: string | null;
  patientPrefix_Rang: string | null;
  patientFirstName: string | null;
  patientLastName: string | null;
  patientPrefixEng: string | null;
  patientPrefix_RangEng: string | null;
  patientFirstNameEng: string | null;
  patientMiddleNameEng: string | null;
  patientLastNameEng: string | null;
}

export enum AppointmentStatus {
  PENDING = "PENDING",
  CONFIRM = "CONFIRMED",
  REJECTED = "REJECTED",
}
