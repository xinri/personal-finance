import { AccountAction, accountActionCreators } from "./account/actions";

export type ApplicationAction = AccountAction;

export const applicationActionCreators = {
  account: accountActionCreators
};
