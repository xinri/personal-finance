import { Reducer } from "redux";
import { operationDomain } from "./domain";
import { OperationState } from "./state";
import { GenericOperationAction } from "./actions";

export const operationReducer: Reducer<OperationState, GenericOperationAction> = operationDomain.reducer;
