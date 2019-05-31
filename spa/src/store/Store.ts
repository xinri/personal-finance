import { Operation } from "../business/operation/model";

export interface State {
  operations: Operation[];
}

export interface Updater {
  (state: State): State;
}

export interface Subscriber {
  (): void;
}

export class Store {
  private state: State;
  private subscriber: Subscriber | undefined = undefined;

  constructor(operations: Operation[]) {
    this.state = {
      operations
    };
  }

  public getState = (): State => {
    return this.state;
  };

  public updateState = (updater: Updater): void => {
    this.state = updater(this.state);
    if (this.subscriber) {
      this.subscriber();
    }
  };

  public subscribe = (subscriber: Subscriber) => {
    this.subscriber = subscriber;
  };

  public getClone = (): Store => {
    const clone = new Store(this.state.operations);
    if (this.subscriber) {
      clone.subscribe(this.subscriber);
    }
    return clone;
  };
}
