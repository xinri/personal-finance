import React from "react";
import { Store } from "./Store";
import { StoreContext } from "./StoreContext";

interface Props {
  store: Store;
  children: React.ReactElement;
}

interface State {
  store: Store;
}

export class StoreProvider extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      store: props.store
    };
    this.props.store.subscribe(this.onStoreUpdate);
  }

  private onStoreUpdate = (): void => {
    const store: Store = this.state.store.getClone();
    this.setState(
      {
        ...this.state,
        store
      },
      this.forceUpdate.bind(this)
    );
  };

  public render() {
    return <StoreContext.Provider value={this.state.store}>{this.props.children}</StoreContext.Provider>;
  }
}
