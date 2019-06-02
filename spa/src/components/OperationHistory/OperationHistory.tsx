import React from "react";
import { Operation as IOperation } from "../../business/operation/model";
import { Operation } from "../Operation";

export interface OwnProps {}

export interface StateProps {
  operations: IOperation[];
}

export interface DispatchProps {
  requestOperationsFetching(): void;
}

export type Props = OwnProps & StateProps & DispatchProps;

export class OperationHistoryComponent extends React.Component<Props, {}> {
  public componentDidMount = (): void => {
    this.props.requestOperationsFetching();
  };

  public render() {
    return (
      <div>
        {this.props.operations.map((operation: IOperation) => (
          <Operation key={operation.id} id={operation.id} />
        ))}
      </div>
    );
  }
}
