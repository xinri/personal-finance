import { OperationHistoryComponent, OwnProps, StateProps, DispatchProps } from "./OperationHistory";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ApplicationState } from "../../business/state";
import { Operation } from "../../business/operation";
import { applicationSelectors } from "../../business/selectors";
import { OperationState } from "../../business/operation/state";
import { ApplicationAction, applicationActionCreators } from "../../business/actions";
import { batchActions, BatchAction } from "redux-batched-actions";

function mapStateToProps(state: ApplicationState): StateProps {
  const operationState: OperationState = state.operation;
  const operations: Operation[] = applicationSelectors.operation.getAllOperations(operationState);
  return { operations };
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  const onOperationsFetched = (operations: Operation[]) => {
    const actions: ApplicationAction[] = operations.map((operation: Operation) => {
      return applicationActionCreators.operation.createInsertAction(operation.id, operation, "ADD_FETCHED_OPERATION");
    });
    const batchedAction: BatchAction = batchActions(actions, "ADD_FETCHED_OPERATIONS");
    dispatch(batchedAction);
  };
  return { onOperationsFetched };
}

export const OperationHistory = connect<StateProps, DispatchProps, OwnProps, ApplicationState>(
  mapStateToProps,
  mapDispatchToProps
)(OperationHistoryComponent);
