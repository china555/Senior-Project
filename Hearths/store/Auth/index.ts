import { StoreonModule } from "storeon";
import { IAuthEvent, IAuthState } from "./@types";
export * from "./@types";

export const authModule: StoreonModule<IAuthState, IAuthEvent> = (store) => {
  store.on("@init", () => ({ isAuthenticated: false }));
  store.on("auth/setIsAuthenticated", (state, isAuthenticated) => ({
    ...state,
    isAuthenticated,
  }));
};
