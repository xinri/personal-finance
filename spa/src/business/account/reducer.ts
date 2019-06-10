import { Reducer } from "redux";
import { accountDomain } from "./domain";
import { AccountState } from "./state";
import { GenericAccountAction } from "./actions";

export const accountReducer: Reducer<AccountState, GenericAccountAction> = accountDomain.reducer;
