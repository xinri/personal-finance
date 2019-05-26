import React from "react";
import { Operation as IOperation } from "../../interfaces/Operation";
import { FinanceDate } from "../FinanceDate";
import { LabeledDebitOrCredit } from "../LabeledDebitOrCredit";
import { OperationActions } from "../OperationActions/OperationActions";
import "./Operation.scss";

export interface OwnProps {
  id: string;
}

export interface StateProps {
  operation: IOperation;
}

export interface UpdateProps {
  onDelete(): void;
}

export type Props = OwnProps & StateProps & UpdateProps;

export const OperationComponent: React.StatelessComponent<Props> = ({
  operation: { id, date, amount },
  onDelete
}: Props) => {
  return (
    <div className="operation" data-e2e="account-operation">
      <LabeledDebitOrCredit amount={amount} renderLabel={() => <FinanceDate date={date} />} />
      <div className="actions-container">
        <div className="actions-content">
          <OperationActions onDelete={onDelete} />
        </div>
      </div>
    </div>
  );
};
