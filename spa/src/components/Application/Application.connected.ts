import { ApplicationComponent, OwnProps, StateProps } from "./Application";
import { connect } from "react-redux";
import { ApplicationState } from "../../business/state";
import { getAllAccounts } from "../../business/account/selectors";

function mapStateToProps(state: ApplicationState): StateProps {
  return {
    accounts: getAllAccounts(state)
  };
}

export const Application = connect<StateProps, undefined, OwnProps, ApplicationState>(
  mapStateToProps,
  undefined
)(ApplicationComponent);
