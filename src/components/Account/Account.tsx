import React from "react";
import { Operation as IOperation } from "../../interfaces/Operation";
import { OperationHistory } from "../OperationHistory";
import { Balance } from "../Balance";

interface Props {
  operations: IOperation[];
}

export const Account: React.StatelessComponent<Props> = ({ operations }: Props) => {
  const balance: number = operations.map(extractAmount).reduce(sum, 0);
  return (
    <div>
      <OperationHistory operations={operations} />
      <Balance amount={balance} />
    </div>
  );
};

function extractAmount({ amount }: IOperation): number {
  return amount;
}

function sum(accumulated: number, current: number): number {
  return accumulated + current;
}
