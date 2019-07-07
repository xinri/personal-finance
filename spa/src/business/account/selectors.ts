import { Account } from "./model";
import { AccountState } from "./state";
import { operationSelectors } from "./operation";

export const accountSelectors = {
  getAllAccounts,
  getAccount,
  operation: operationSelectors
};

export function getAllAccounts(state: AccountState): Account[] {
  return Object.keys(state).map((key: string) => state[key]);
}

export function getAccount(state: AccountState, id: string): Account {
  const account: Account | undefined = state[id];
  if (account === undefined) {
    throw new Error(`No account matches the following id: ${id}`);
  }
  return account;
}
