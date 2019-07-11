import { BalanceComponent, OwnProps, StateProps } from "./Balance";
import { connect } from "react-redux";
import { ApplicationState } from "../../business/state";
import { computeBalance } from "../../business/account/selectors";

function mapStateToProps(state: ApplicationState, { accountId }: OwnProps): StateProps {
  const balance: number = computeBalance(state, accountId);
  return { amount: balance };
}

export const Balance = connect<StateProps, undefined, OwnProps, ApplicationState>(
  mapStateToProps,
  undefined
)(BalanceComponent);
