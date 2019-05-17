import React from "react";
import { Operation as IOperation } from "../../interfaces/Operation";
import { FinanceDate } from "../FinanceDate";
import { FinanceValue } from "../FinanceValue";

interface Props {
  operation: IOperation;
}

export const Operation: React.StatelessComponent<Props> = ({ operation: { date, amount } }: Props) => {
  return (
    <div className="operation">
      <FinanceDate date={date} />
      {" | "}
      <FinanceValue amount={amount} />
    </div>
  );
};
