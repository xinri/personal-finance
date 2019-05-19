import React from "react";
import { Operation as IOperation } from "../../interfaces/Operation";
import uuid from "uuid/v4";
import "./AddOperation.scss";

interface Props {
  onNewOperation(operation: IOperation): void;
}

interface State {
  value: number | undefined;
}

export class AddOperation extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      value: undefined
    };
  }

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
        <input className="input-amount" type="number" onChange={this.onInputChange} />
        <button
          onClick={this.onButtonClick}
          className="add-amount mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
        >
          Add
        </button>
      </div>
    );
  }
}
