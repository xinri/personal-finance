import React from "react";
import { Operation } from "./interfaces";

interface Props {
  operation: Operation;
}

export const OperationComponent: React.StatelessComponent<Props> = ({ operation: { date, amount } }: Props) => {
  const dateText: string = date.toDateString();
  const amountText: string = (amount >= 0 ? "+" : "") + amount.toString();
  return (
    <div className="operation">
      {dateText} | {amountText}
    </div>
  );
};
