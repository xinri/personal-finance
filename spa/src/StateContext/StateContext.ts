import React from "react";
import { Operation as IOperation } from "../interfaces/Operation";

export interface State {
  operations: IOperation[];
}

export const StateContext: React.Context<State> = React.createContext<State>({ operations: [] });
