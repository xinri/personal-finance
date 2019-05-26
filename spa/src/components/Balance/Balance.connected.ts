import { connect, State } from "../../store";
import { BalanceComponent, StateProps } from "./Balance";
import { Operation } from "../../interfaces/Operation";

function computeStateProps(state: State): StateProps {
  const balance: number = state.operations.map(extractAmount).reduce(sum, 0);
  return { amount: balance };
}

function extractAmount({ amount }: Operation): number {
  return amount;
}

function sum(accumulated: number, current: number): number {
  return accumulated + current;
}

export const Balance = connect<{}, StateProps, {}>(
  BalanceComponent,
  { computeStateProps }
);
