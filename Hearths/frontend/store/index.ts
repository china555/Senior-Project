import { createContext } from "react";
import { createStoreon } from "storeon";
import { customContext } from "storeon/react";
import { authModule } from "./auth";
import { IAuthEvent, IAuthState } from "./auth/@types";
import { localeModule } from "./locale";
import { ILocaleEvent, ILocaleState } from "./locale/@types";

type State = ILocaleState & IAuthState;
type Events = ILocaleEvent & IAuthEvent;

export const store = createStoreon<State, Events>([localeModule, authModule]);
export const StoreonContext = createContext(store);

export const useAppStore = customContext(StoreonContext);
