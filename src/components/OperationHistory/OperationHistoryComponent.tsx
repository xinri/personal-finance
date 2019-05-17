import React from "react";
import { Operation } from "../../interfaces/Operation";
import { OperationComponent } from "../Operation";

interface Props {
  operations: Operation[];
}

export const OperationHistoryComponent: React.StatelessComponent<Props> = ({ operations }: Props) => {
  return (
    <div>
      {operations.map((operation: Operation) => (
        <OperationComponent key={operation.id} operation={operation} />
      ))}
    </div>
  );
};
