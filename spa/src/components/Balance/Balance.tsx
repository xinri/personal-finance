import React from "react";
import { LabeledDebitOrCredit } from "../LabeledDebitOrCredit";
import "./Balance.scss";

interface Props {
  amount: number;
}

export const Balance: React.StatelessComponent<Props> = ({ amount }: Props) => {
  return (
    <div className="balance">
      <LabeledDebitOrCredit amount={amount} renderLabel={() => <span>Balance</span>} />
    </div>
  );
};
