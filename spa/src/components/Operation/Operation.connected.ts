import { OperationComponent, OwnProps, StateProps, DispatchProps } from "./Operation";
import { connect } from "react-redux";
import { ExtendedDispatch } from "../../business/definitions";
import { ApplicationState } from "../../business/state";
import { Operation as IOperation } from "../../business/account/operation";
import business from "../../business";

function mapStateToProps(state: ApplicationState, { id }: OwnProps): StateProps {
  const operation: IOperation = business.getOperation(state, id);
  return { operation };
}

function mapDispatchToProps(dispatch: ExtendedDispatch, { id }: OwnProps): DispatchProps {
  const deleteOperation = () => {
    const thunk = business.deleteOperation(id);
    dispatch(thunk);
  };
  return { deleteOperation };
}

export const Operation = connect<StateProps, DispatchProps, OwnProps, ApplicationState>(
  mapStateToProps,
  mapDispatchToProps
)(OperationComponent);
