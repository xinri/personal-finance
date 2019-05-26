import * as React from "react";
import { StoreContext } from "./StoreContext";
import { Store, State, Updater } from "./Store";

export interface ComputeStatePropsFunction<OwnProps, StateProps> {
  (state: State, ownProps: OwnProps): StateProps;
}

export interface ComputeUpdatePropsFunction<OwnProps, UpdateProps> {
  (updateState: (updater: Updater) => void, ownProps: OwnProps): UpdateProps;
}

export const connect = <OwnProps, StateProps, UpdateProps>(
  Component: React.ComponentType<OwnProps & StateProps & UpdateProps>,
  {
    computeStateProps,
    computeUpdateProps
  }: {
    computeStateProps?: ComputeStatePropsFunction<OwnProps, StateProps>;
    computeUpdateProps?: ComputeUpdatePropsFunction<OwnProps, UpdateProps>;
  }
): React.ComponentType<OwnProps> => {
  const ConnectedComponent: React.StatelessComponent<OwnProps> = (ownProps: OwnProps) => {
    return (
      <StoreContext.Consumer>
        {(store: Store | undefined) => {
          if (store) {
            const stateProps: StateProps = computeStateProps
              ? computeStateProps(store.getState(), ownProps)
              : ({} as StateProps);
            const updateProps: UpdateProps = computeUpdateProps
              ? computeUpdateProps(store.updateState, ownProps)
              : ({} as UpdateProps);
            return <Component {...ownProps} {...stateProps} {...updateProps} />;
          }
        }}
      </StoreContext.Consumer>
    );
  };
  return ConnectedComponent;
};
