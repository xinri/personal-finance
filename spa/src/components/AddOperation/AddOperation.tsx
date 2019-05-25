import React from "react";
import { Operation as IOperation } from "../../interfaces/Operation";
import uuid from "uuid/v4";
import "./AddOperation.scss";

export interface OwnProps {}

export interface DispatchProps {
  onNewOperation(operation: IOperation): void;
}

type Props = OwnProps & DispatchProps;

interface State {
  value: number | undefined;
}

export class AddOperationComponent extends React.Component<Props, State> {
  private inputRef: React.RefObject<HTMLInputElement>;

  constructor(props: Props) {
    super(props);
    this.state = {
      value: undefined
    };
    this.inputRef = React.createRef();
  }

  private onInputFocus = (): void => {
    if (this.inputRef.current) {
      this.inputRef.current.select();
    }
  };

  private setValue = (value: number | undefined): void => {
    this.setState({
      ...this.state,
      value
    });
  };

  private onInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const valueAsString: string = event.target.value;
    if (valueAsString === "") {
      this.setValue(undefined);
    }
    const value: number = parseFloat(valueAsString);
    if (!isNaN(value)) {
      this.setValue(value);
    }
  };

  private onButtonClick = (): void => {
    const amount: number | undefined = this.state.value;
    if (amount !== undefined && amount !== 0) {
      this.setValue(undefined);
      this.props.onNewOperation({
        id: uuid(),
        date: new Date(),
        amount
      });
    }
  };

  render() {
    return (
      <div className="add-operation">
        <input
          ref={this.inputRef}
          className="input-amount"
          type="number"
          value={this.state.value || ""}
          onFocus={this.onInputFocus}
          onChange={this.onInputChange}
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
