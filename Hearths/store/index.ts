import { createContext } from "react";
import { createStoreon } from "storeon";
import { customContext } from "storeon/react";
import { authModule, IAuthEvent, IAuthState } from "./Auth";

import { localeModule } from "./locale";
import { ILocaleEvent, ILocaleState } from "./locale/@types";

type State = ILocaleState & IAuthState;
type Events = ILocaleEvent & IAuthEvent;

export const store = createStoreon<State, Events>([localeModule, authModule]);
export const StoreonContext = createContext(store);

export const useAppStore = customContext(StoreonContext);
