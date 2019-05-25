import { t } from "testcafe";
import { e2eSelector } from "../util/selector";
import { Count } from "../util/count";
import { OPERATION, OPERATION_DELETE } from "./selectors";

export class Operation {
  private count: Count;

  constructor(count: Count) {
    this.count = count;
  }

  public async delete(): Promise<void> {
    await t.hover(e2eSelector(OPERATION).nth(this.count));
    await t.click(e2eSelector(OPERATION_DELETE).nth(this.count));
  }
}
