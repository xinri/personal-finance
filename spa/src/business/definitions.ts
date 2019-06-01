import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "./state";
import { ApplicationAction } from "./actions";
import { BatchAction } from "redux-batched-actions";

export type Dispatchable = ApplicationAction | BatchAction;

export type Thunk = ThunkAction<void, ApplicationState, {}, Dispatchable>;

export type ExtendedDispatch = ThunkDispatch<ApplicationState, {}, Dispatchable>;
