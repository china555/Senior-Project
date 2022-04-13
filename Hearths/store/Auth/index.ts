import { StoreonModule } from "storeon";
import { IAuthEvent, IAuthState, IInfoEvent, IInfoState } from "./@types";
export * from "./@types";

export const authModule: StoreonModule<IAuthState, IAuthEvent> = (store) => {
  store.on("@init", () => ({ isAuthenticated: false }));
  store.on("auth/setIsAuthenticated", (state, isAuthenticated) => ({
    ...state,
    isAuthenticated,
  }));
};

export const userInfo: StoreonModule<IInfoState, IInfoEvent> = (store) => {
  store.on("@init", () => ({
    patientFirstName: null,
    patientFirstNameEng: null,
    patientLastName: null,
    patientLastNameEng: null,
    patientMiddleNameEng: null,
    patientPrefix: null,
    patientPrefixEng: null,
    patientPrefix_Rang: null,
    patientPrefix_RangEng: null,
  }));
  store.on("auth/setPatientInfo", (state, patientInfo) => ({
    ...state,
    patientInfo,
  }));
};
