import { OperationHistoryComponent, OwnProps, StateProps, DispatchProps } from "./OperationHistory";
import { connect } from "react-redux";
import { ExtendedDispatch } from "../../business/definitions";
import { ApplicationState } from "../../business/state";
import { Operation } from "../../business/operation";
import { applicationSelectors } from "../../business/selectors";
import { OperationState } from "../../business/operation/state";
import { applicationThunksCreators } from "../../business/thunks";

function mapStateToProps(state: ApplicationState): StateProps {
  const operationState: OperationState = state.operation;
  const operations: Operation[] = applicationSelectors.operation.getAllOperations(operationState);
  return { operations };
}

function mapDispatchToProps(dispatch: ExtendedDispatch): DispatchProps {
  const requestOperationsFetching = () => {
    const thunk = applicationThunksCreators.createOperationsFetchingRequestedThunk();
    dispatch(thunk);
  };
  return { requestOperationsFetching };
}

export const OperationHistory = connect<StateProps, DispatchProps, OwnProps, ApplicationState>(
  mapStateToProps,
  mapDispatchToProps
)(OperationHistoryComponent);
