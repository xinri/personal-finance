import { Account } from "./model";

const account0: Account = {
  id: "Class 2",
  title: "Asset Accounts"
};

const account1: Account = {
  id: "Class 5",
  title: "Financial Accounts"
};

const accounts: Account[] = [account0, account1];

export const accountFixtures = {
  account0,
  account1,
  accounts
};
