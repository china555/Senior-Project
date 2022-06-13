import Cookies from "js-cookie";
import { IAppointment } from "./type";
export const signout = () => {
  Object.keys(Cookies.get()).forEach(function (cookieName) {
    Cookies.remove(cookieName);
  });
};

export const showNameForPatient = (patient: IAppointment) => {
  let name = "";
  if (
    patient.patientPrefix_Rang === null &&
    patient.patientPrefix_RangEng === null
  ) {
    if (patient.patientPrefix === null) {
      name = name + patient.patientPrefixEng;
    } else {
      name = name + patient.patientPrefix;
    }
  } else {
    if (patient.patientPrefix_Rang === null) {
      name = name + patient.patientPrefix_RangEng;
    } else {
      name = name + patient.patientPrefix_Rang;
    }
  }
  if (patient.patientFirstName === null) {
    name =
      name +
      `${patient.patientFirstNameEng} ${patient.patientMiddleNameEng} ${patient.patientLastNameEng}`;
  } else {
    name = name + `${patient.patientFirstName} ${patient.patientLastName}`;
  }
  return name;
};
