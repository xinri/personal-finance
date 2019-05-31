import { combineReducers } from "redux";
import { operationReducer } from "./operation";

export const rootReducer = combineReducers({
  operation: operationReducer
});
