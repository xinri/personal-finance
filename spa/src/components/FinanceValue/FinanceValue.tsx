import React from "react";

interface Props {
  amount: number;
}

export const FinanceValue: React.StatelessComponent<Props> = ({ amount }: Props) => {
  const amountText: string = (amount >= 0 ? "+" : "") + amount.toString();
  return <span className="value">{amountText}</span>;
};
