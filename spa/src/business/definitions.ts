import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "./state";
import { ApplicationAction } from "./actions";
import { BatchAction } from "redux-batched-actions";
import { applicationThunksCreators } from "./thunks";
import { applicationSelectors } from "./selectors";
import { ApplicationApi } from "./api";

export type Dispatchable = ApplicationAction | BatchAction;

export interface ExtraArgument {
  thunkCreators: typeof applicationThunksCreators;
  selectors: typeof applicationSelectors;
  api: ApplicationApi;
}

export type Thunk = ThunkAction<void | Promise<void>, ApplicationState, ExtraArgument, Dispatchable>;

export type ExtendedDispatch = ThunkDispatch<ApplicationState, ExtraArgument, Dispatchable>;
