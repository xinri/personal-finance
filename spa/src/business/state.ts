import { AccountState } from "./account/state";
import { OperationState } from "./account/operation/state";

export interface ApplicationState {
  account: AccountState;
  operation: OperationState;
}
