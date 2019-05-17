import React from "react";
import { Operation as IOperation } from "../../interfaces/Operation";

interface Props {
  operation: IOperation;
}

export const Operation: React.StatelessComponent<Props> = ({ operation: { date, amount } }: Props) => {
  const dateText: string = date.toDateString();
  const amountText: string = (amount >= 0 ? "+" : "") + amount.toString();
  return (
    <div className="operation">
      {dateText} | {amountText}
    </div>
  );
};
