import { Sequence } from "redux-integration-testing";
import { operationFixtures } from "../business/account/operation/fixtures";
import business from "../business";

const { operation0, operation1, operation2 } = operationFixtures;

const AN_ACCOUNT_WITH_3_OPERATIONS_FROM_FIXTURES: Sequence = [
  business.account.operation.createInsertAction(operation0.id, operation0),
  business.account.operation.createInsertAction(operation1.id, operation1),
  business.account.operation.createInsertAction(operation2.id, operation2)
];

export const entryPoints = {
  AN_ACCOUNT_WITH_3_OPERATIONS_FROM_FIXTURES
};
