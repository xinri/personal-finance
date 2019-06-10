import React from "react";
import { Operation } from "../../business/account/operation/model";
import uuid from "uuid/v4";
import "./AddOperation.scss";

interface Props {
  onNewOperation(operation: Operation): void;
}

interface State {}

export class AddOperation extends React.Component<Props, State> {
  private inputRef: React.RefObject<HTMLInputElement>;

  constructor(props: Props) {
    super(props);
    this.inputRef = React.createRef();
  }

  private onButtonClick = (): void => {
    if (this.inputRef.current) {
      const value: string = this.inputRef.current.value;
      const amount: number = parseFloat(value);
      if (!isNaN(amount) && amount !== 0) {
        this.inputRef.current.value = "";
        this.props.onNewOperation({
          id: uuid(),
          date: new Date(),
          amount
        });
      }
    }
  };

  render() {
    return (
      <div className="add-operation">
        <input
          ref={this.inputRef}
          className="input-amount"
          type="number"
          data-e2e="account-new-operation-input-amount"
        />
        <button
          onClick={this.onButtonClick}
          className="add-amount mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
          data-e2e="account-new-operation-add-amount"
        >
          Add
        </button>
      </div>
    );
  }
}
