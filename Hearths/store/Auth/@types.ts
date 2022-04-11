export interface IAuthState {
  isAuthenticated: boolean;
}

export interface IAuthEvent {
  "auth/setIsAuthenticated": boolean;
}
export interface IInfoEvent {
  "auth/setPatientInfo": IInfoState;
}
export interface IInfoState {
  patientFirstName: string | null;
  patientFirstNameEng: string | null;
  patientLastName: string | null;
  patientLastNameEng: string | null;
  patientMiddleNameEng: string | null;
  patientPrefix: string | null;
  patientPrefixEng: string | null;
  patientPrefix_Rang: string | null;
  patientPrefix_RangEng: string | null;
}
