import { t } from "testcafe";
import { e2eSelector } from "../util/selector";
import { NEW_OPERATION_INPUT_AMOUNT, NEW_OPERATION_ADD_AMOUNT, BALANCE, OPERATION } from "./selectors";

export class Account {
  public async addOperation({ amount }: { amount: number }): Promise<void> {
    await this.inputAmount(amount);
    await this.addAmount();
  }

  private async inputAmount(amount: number): Promise<void> {
    await t.typeText(e2eSelector(NEW_OPERATION_INPUT_AMOUNT), amount.toString());
  }

  private async addAmount(): Promise<void> {
    await t.click(e2eSelector(NEW_OPERATION_ADD_AMOUNT));
  }

  public async expectNumberOfOperationsToEqual(n: number): Promise<void> {
    await t.expect(e2eSelector(OPERATION).count).eql(n);
  }

  public async expectBalanceToEqual(balance: number): Promise<void> {
    const actualValue: string = await e2eSelector(BALANCE).find("span.value").innerText;
    const actualBalance: number = parseFloat(actualValue.replace("+", ""));
    await t.expect(actualBalance).eql(balance);
  }
}
