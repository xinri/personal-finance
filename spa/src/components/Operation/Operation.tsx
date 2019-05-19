import React from "react";
import { Operation as IOperation } from "../../interfaces/Operation";
import { FinanceDate } from "../FinanceDate";
import { LabeledDebitOrCredit } from "../LabeledDebitOrCredit";
import "./Operation.scss";

interface Props {
  operation: IOperation;
}

export const Operation: React.StatelessComponent<Props> = ({ operation: { date, amount } }: Props) => {
  return (
    <div className="operation" data-e2e="account-operation">
      <LabeledDebitOrCredit amount={amount} renderLabel={() => <FinanceDate date={date} />} />
    </div>
  );
};
