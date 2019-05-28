import React from "react";
import { Operation as IOperation } from "../../interfaces/Operation";
import { FinanceDate } from "../FinanceDate";
import { LabeledDebitOrCredit } from "../LabeledDebitOrCredit";
import { OperationActions } from "../OperationActions/OperationActions";
import { _delete } from "../../util/xhr";
import "./Operation.scss";
import { deleteOperation } from "./api";

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

export class OperationComponent extends React.Component<Props, {}> {
  private onDelete = (): void => {
    deleteOperation(this.props.id).then(this.props.onDelete);
  };

  public render() {
    const { date, amount } = this.props.operation;
    return (
      <div className="operation" data-e2e="account-operation">
        <LabeledDebitOrCredit amount={amount} renderLabel={() => <FinanceDate date={date} />} />
        <div className="actions-container">
          <div className="actions-content">
            <OperationActions onDelete={this.onDelete} />
          </div>
        </div>
      </div>
    );
  }
}
