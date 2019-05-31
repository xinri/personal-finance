import { AddOperationComponent, DispatchProps } from "./AddOperation";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Operation } from "../../business/operation";
import { ApplicationState } from "../../business/state";
import { applicationActionCreators, ApplicationAction } from "../../business/actions";

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  const onNewOperation = (operation: Operation) => {
    const action: ApplicationAction = applicationActionCreators.operation.createOperationAddedAction(operation);
    dispatch(action);
  };
  return { onNewOperation };
}

export const AddOperation = connect<{}, DispatchProps, {}, ApplicationState>(
  undefined,
  mapDispatchToProps
)(AddOperationComponent);
