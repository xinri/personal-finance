import { combineReducers } from "redux";
import { accountReducer } from "./account/reducer";
import { operationReducer } from "./account/operation";

export const rootReducer = combineReducers({
  account: accountReducer,
  operation: operationReducer
});
