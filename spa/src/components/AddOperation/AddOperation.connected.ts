import { AddOperationComponent, OwnProps, DispatchProps } from "./AddOperation";
import { connect } from "react-redux";
import { ExtendedDispatch } from "../../business/definitions";
import { RawOperation } from "../../business/account/operation";
import { ApplicationState } from "../../business/state";
import business from "../../business";

function mapDispatchToProps(dispatch: ExtendedDispatch, { accountId }: OwnProps): DispatchProps {
  const addOperation = (operation: RawOperation) => {
    const thunk = business.addOperation(accountId, operation);
    dispatch(thunk);
  };
  return { addOperation };
}

export const AddOperation = connect<{}, DispatchProps, OwnProps, ApplicationState>(
  undefined,
  mapDispatchToProps
)(AddOperationComponent);
