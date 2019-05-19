import React from "react";
import { Operation as IOperation } from "../../interfaces/Operation";
import { Operation } from "../Operation";

interface Props {
  operations: IOperation[];
}

export const OperationHistory: React.StatelessComponent<Props> = ({ operations }: Props) => {
  return (
    <div>
      {operations.map((operation: IOperation) => (
        <Operation key={operation.id} operation={operation} />
      ))}
    </div>
  );
};
