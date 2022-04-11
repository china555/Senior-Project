import { createContext } from "react";
import { createStoreon } from "storeon";
import { customContext } from "storeon/react";
import {
  authModule,
  IAuthEvent,
  IAuthState,
  IInfoEvent,
  IInfoState,
  userInfo,
} from "./Auth";

import { localeModule } from "./locale";
import { ILocaleEvent, ILocaleState } from "./locale/@types";

type State = ILocaleState & IAuthState & IInfoState;
type Events = ILocaleEvent & IAuthEvent & IInfoEvent;

export const store = createStoreon<State, Events>([
  localeModule,
  authModule,
  userInfo,
]);
export const StoreonContext = createContext(store);

export const useAppStore = customContext(StoreonContext);
