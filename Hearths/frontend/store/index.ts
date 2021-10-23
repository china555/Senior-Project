import { createContext } from "react";
import { createStoreon } from "storeon";
import { customContext } from "storeon/react";
import { localeModule } from "./locale";
import { ILocaleEvent, ILocaleState } from "./locale/@types";

type State = ILocaleState;
type Events = ILocaleEvent;

export const store = createStoreon<State, Events>([localeModule]);
export const StoreonContext = createContext(store);

export const useAppStore = customContext(StoreonContext);
