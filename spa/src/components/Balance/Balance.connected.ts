import { BalanceComponent, StateProps } from "./Balance";
import { connect } from "react-redux";
import { ApplicationState } from "../../business/state";
import business from "../../business";

function mapStateToProps(state: ApplicationState): StateProps {
  const balance: number = business.account.operation.computeBalance(state);
  return { amount: balance };
}

export const Balance = connect<StateProps, undefined, {}, ApplicationState>(
  mapStateToProps,
  undefined
)(BalanceComponent);
