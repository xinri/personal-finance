import React from "react";
import { OperationHistory } from "../OperationHistory";
import { Balance } from "../Balance";
import { AddOperation } from "../AddOperation";

export interface Props {}

export const Account: React.StatelessComponent<Props> = () => {
  return (
    <div>
      <AddOperation />
      <OperationHistory />
      <Balance />
    </div>
  );
};
