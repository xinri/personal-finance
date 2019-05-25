import React from "react";
import { Operation as IOperation } from "../../interfaces/Operation";
import { Operation } from "../Operation";

export interface Props {
  operations: IOperation[];
  onDelete(id: string): void;
}

export const OperationHistory: React.StatelessComponent<Props> = ({ operations, onDelete }: Props) => {
  return (
    <div>
      {operations.map((operation: IOperation) => (
        <Operation key={operation.id} operation={operation} onDelete={onDelete} />
      ))}
    </div>
  );
};
