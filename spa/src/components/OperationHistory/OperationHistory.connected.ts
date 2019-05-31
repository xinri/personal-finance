import { OperationHistoryComponent, OwnProps, StateProps, DispatchProps } from "./OperationHistory";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ApplicationState } from "../../business/state";
import { Operation } from "../../business/operation";
import { applicationSelectors } from "../../business/selectors";
import { OperationState } from "../../business/operation/state";
import { ApplicationAction, applicationActionCreators } from "../../business/actions";

function mapStateToProps(state: ApplicationState): StateProps {
  const operationState: OperationState = state.operation;
  const operations: Operation[] = applicationSelectors.operation.getAllOperations(operationState);
  return { operations };
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  const onOperationsFetched = (operations: Operation[]) => {
    operations.map((operation: Operation) => {
      const action: ApplicationAction = applicationActionCreators.operation.createInsertAction(
        operation.id,
        operation,
        "ADD_FETCHED_OPERATION"
      );
      dispatch(action);
    });
  };
  return { onOperationsFetched };
}

export const OperationHistory = connect<StateProps, DispatchProps, OwnProps, ApplicationState>(
  mapStateToProps,
  mapDispatchToProps
)(OperationHistoryComponent);
