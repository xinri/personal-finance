import { OperationComponent, OwnProps, StateProps, DispatchProps } from "./Operation";
import { connect } from "react-redux";
import { ExtendedDispatch } from "../../business/definitions";
import { ApplicationState } from "../../business/state";
import { Operation as IOperation } from "../../business/account/operation";
import { OperationState } from "../../business/account/operation/state";
import { applicationSelectors } from "../../business/selectors";
import { applicationThunksCreators } from "../../business/thunks";

function mapStateToProps(state: ApplicationState, { id }: OwnProps): StateProps {
  const operationState: OperationState = state.operation;
  const operation: IOperation = applicationSelectors.account.operation.getOperation(operationState, id);
  return { operation };
}

function mapDispatchToProps(dispatch: ExtendedDispatch, { id }: OwnProps): DispatchProps {
  const requestDeleteOperation = () => {
    const thunk = applicationThunksCreators.account.operation.createDeleteOperationRequestedThunk(id);
    dispatch(thunk);
  };
  return { requestDeleteOperation };
}

export const Operation = connect<StateProps, DispatchProps, OwnProps, ApplicationState>(
  mapStateToProps,
  mapDispatchToProps
)(OperationComponent);
