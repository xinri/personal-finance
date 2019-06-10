import { Account } from "./model";
import { GenericAction } from "redux-generic";
import { accountDomain } from "./domain";
import { operationActionCreators, OperationAction } from "./operation/actions";

export type GenericAccountAction = GenericAction<Account>;

export type AccountAction = GenericAccountAction | OperationAction;

export const accountActionCreators = {
  ...accountDomain.actionCreators,
  operation: operationActionCreators
};
