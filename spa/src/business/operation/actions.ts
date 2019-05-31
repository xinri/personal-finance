import { Action } from "redux";
import { Operation } from "./model";

export type OperationAction = OperationsFetchedAction | OperationAddedAction | OperationDeletedAction;

export const operationActionCreators = {
  createOperationsFetchedAction,
  createOperationAddedAction,
  createOperationDeletedAction
};

interface OperationsFetchedAction extends Action<string> {
  type: "ACTIONS_FETCHED";
  operations: Operation[];
}

function createOperationsFetchedAction(operations: Operation[]): OperationsFetchedAction {
  return {
    type: "ACTIONS_FETCHED",
    operations
  };
}

interface OperationAddedAction extends Action<string> {
  type: "OPERATION_ADDED";
  operation: Operation;
}

function createOperationAddedAction(operation: Operation): OperationAddedAction {
  return {
    type: "OPERATION_ADDED",
    operation
  };
}

interface OperationDeletedAction extends Action<string> {
  type: "OPERATION_DELETED";
  operationId: string;
}

function createOperationDeletedAction(operationId: string): OperationDeletedAction {
  return {
    type: "OPERATION_DELETED",
    operationId
  };
}
