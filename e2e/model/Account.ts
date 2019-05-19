import { t } from "testcafe";
import { e2eSelector } from "../util/selector";
import { NEW_OPERATION_INPUT_AMOUNT, NEW_OPERATION_ADD_AMOUNT, OPERATION } from "./selectors";

export class Account {
  public async inputAmount(amount: number): Promise<void> {
    await t.typeText(e2eSelector(NEW_OPERATION_INPUT_AMOUNT), amount.toString());
  }

  public async addAmount(): Promise<void> {
    await t.click(e2eSelector(NEW_OPERATION_ADD_AMOUNT));
  }

  public async expectNumberOfOperationsToEqual(n: number): Promise<void> {
    await t.expect(e2eSelector(OPERATION).count).eql(n);
  }
}
