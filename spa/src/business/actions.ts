import { OperationAction, operationActionCreators } from "./operation/actions";

export type ApplicationAction = OperationAction;

export const applicationActionCreators = {
  operation: operationActionCreators
};
