import React from "react";
import { Operation as IOperation } from "../../interfaces/Operation";
import { Operation } from "../Operation";

export interface OwnProps {}

export interface StateProps {
  operations: IOperation[];
}

export type Props = OwnProps & StateProps;

export const OperationHistoryComponent: React.StatelessComponent<Props> = ({ operations }: Props) => {
  return (
    <div>
      {operations.map((operation: IOperation) => (
        <Operation key={operation.id} id={operation.id} />
      ))}
    </div>
  );
};
