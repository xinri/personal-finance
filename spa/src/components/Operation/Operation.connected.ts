import { OperationComponent, OwnProps, StateProps, DispatchProps } from "./Operation";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ApplicationState } from "../../business/state";
import { Operation as IOperation } from "../../business/operation";
import { OperationState } from "../../business/operation/state";
import { applicationSelectors } from "../../business/selectors";
import { ApplicationAction, applicationActionCreators } from "../../business/actions";

function mapStateToProps(state: ApplicationState, { id }: OwnProps): StateProps {
  const operationState: OperationState = state.operation;
  const operation: IOperation = applicationSelectors.operation.getOperation(operationState, id);
  return { operation };
}

function mapDispatchToProps(dispatch: Dispatch, { id }: OwnProps): DispatchProps {
  const onDelete = () => {
    const action: ApplicationAction = applicationActionCreators.operation.createOperationDeletedAction(id);
    dispatch(action);
  };
  return { onDelete };
}

export const Operation = connect<StateProps, DispatchProps, OwnProps, ApplicationState>(
  mapStateToProps,
  mapDispatchToProps
)(OperationComponent);
