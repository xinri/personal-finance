import { Setup } from "../setup";
import { Account } from "../model";

const setup = new Setup();
const account = new Account();

fixture("Account").page(setup.getAccountUrl());

test("Should allow the user to add a new operation", async () => {
  await account.expectBalanceToEqual(55);
  await account.expectNumberOfOperationsToEqual(3);
  await account.addOperation({ amount: 100 });
  await account.expectNumberOfOperationsToEqual(4);
  await account.expectBalanceToEqual(155);
});
