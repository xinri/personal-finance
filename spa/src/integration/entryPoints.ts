import { Sequence } from "redux-integration-testing";
import { applicationActionCreators } from "../business/actions";
import { operationFixtures } from "../business/operation/fixtures";

const { operation0, operation1, operation2 } = operationFixtures;

const AN_ACCOUNT_WITH_3_OPERATIONS_FROM_FIXTURES: Sequence = [
  applicationActionCreators.operation.createInsertAction(operation0.id, operation0),
  applicationActionCreators.operation.createInsertAction(operation1.id, operation1),
  applicationActionCreators.operation.createInsertAction(operation2.id, operation2)
];

export const entryPoints = {
  AN_ACCOUNT_WITH_3_OPERATIONS_FROM_FIXTURES
};
