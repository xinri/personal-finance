import { OperationHistoryComponent, OwnProps, StateProps, DispatchProps } from "./OperationHistory";
import { connect } from "react-redux";
import { ExtendedDispatch } from "../../business/definitions";
import { ApplicationState } from "../../business/state";
import { Operation } from "../../business/account/operation";
import business from "../../business";

function mapStateToProps(state: ApplicationState): StateProps {
  const operations: Operation[] = business.account.operation.getAllOperations(state);
  return { operations };
}

function mapDispatchToProps(dispatch: ExtendedDispatch): DispatchProps {
  const requestOperationsFetching = () => {
    const thunk = business.account.operation.fetchOperations();
    dispatch(thunk);
  };
  return { requestOperationsFetching };
}

export const OperationHistory = connect<StateProps, DispatchProps, OwnProps, ApplicationState>(
  mapStateToProps,
  mapDispatchToProps
)(OperationHistoryComponent);
