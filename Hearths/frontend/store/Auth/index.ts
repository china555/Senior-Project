import { StoreonModule } from "storeon";

export const Auth = (store: any) => {
  store.on("@init", () => false);
};
