import React from "react";
import { Operation as IOperation } from "../../interfaces/Operation";
import { FinanceDate } from "../FinanceDate";
import { DebitOrCredit } from "../DebitOrCredit";
import "./Operation.scss";

interface Props {
  operation: IOperation;
}

export const Operation: React.StatelessComponent<Props> = ({ operation: { date, amount } }: Props) => {
  return (
    <div className="operation">
      <div className="date-container">
        <FinanceDate date={date} />
      </div>
      <div className="amount-container">
        <DebitOrCredit amount={amount} />
      </div>
    </div>
  );
};
