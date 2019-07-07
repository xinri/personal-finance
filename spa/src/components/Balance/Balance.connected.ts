import { BalanceComponent, StateProps } from "./Balance";
import { connect } from "react-redux";
import { ApplicationState } from "../../business/state";
import { OperationState } from "../../business/account/operation/state";
import business from "../../business";

function mapStateToProps(state: ApplicationState): StateProps {
  const operationState: OperationState = state.operation;
  const balance: number = business.account.operation.computeBalance(operationState);
  return { amount: balance };
}

export const Balance = connect<StateProps, undefined, {}, ApplicationState>(
  mapStateToProps,
  undefined
)(BalanceComponent);
