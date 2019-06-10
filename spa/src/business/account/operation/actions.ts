import { Operation } from "./model";
import { GenericAction } from "redux-generic";
import { operationDomain } from "./domain";

export type GenericOperationAction = GenericAction<Operation>;

export type OperationAction = GenericOperationAction;

export const operationActionCreators = {
  ...operationDomain.actionCreators
};
