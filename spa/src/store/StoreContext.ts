import React from "react";
import { Store } from "./Store";

export const StoreContext: React.Context<Store | undefined> = React.createContext<Store | undefined>(undefined);
