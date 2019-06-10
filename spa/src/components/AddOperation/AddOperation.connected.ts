import { AddOperationComponent, DispatchProps } from "./AddOperation";
import { connect } from "react-redux";
import { ExtendedDispatch } from "../../business/definitions";
import { Operation } from "../../business/account/operation";
import { ApplicationState } from "../../business/state";
import { applicationThunksCreators } from "../../business/thunks";

function mapDispatchToProps(dispatch: ExtendedDispatch): DispatchProps {
  const requestAddOperation = (operation: Operation) => {
    const thunk = applicationThunksCreators.account.operation.createAddOperationRequestedThunk(operation);
    dispatch(thunk);
  };
  return { requestAddOperation };
}

export const AddOperation = connect<{}, DispatchProps, {}, ApplicationState>(
  undefined,
  mapDispatchToProps
)(AddOperationComponent);
