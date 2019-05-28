import React from "react";
import { Operation as IOperation } from "../../interfaces/Operation";
import { Operation } from "../Operation";
import { getOperations } from "./api";

export interface OwnProps {}

export interface StateProps {
  operations: IOperation[];
}

export interface UpdateProps {
  onOperationsFetched(operations: IOperation[]): void;
}

export type Props = OwnProps & StateProps & UpdateProps;

export class OperationHistoryComponent extends React.Component<Props, {}> {
  public componentDidMount = (): void => {
    getOperations().then(this.props.onOperationsFetched);
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
