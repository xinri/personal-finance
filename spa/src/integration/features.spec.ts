import { getTester, noop } from "redux-integration-testing";
import { Dispatch } from "redux";
import { ApplicationState } from "../business/state";
import { entryPoints } from "./entryPoints";
import { Application, enhancer, Count } from "./pageModel";
import { makeGetStore } from "../store";
import { ApplicationApi } from "../business/api";

it("Should allow to display operations", done => {
  const applicationApi = {} as ApplicationApi;

  const t = getTester<ApplicationState, typeof entryPoints, Dispatch, Application>({
    getStore: makeGetStore(applicationApi),
    entryPoints,
    enhancer
  });

  t.given(({ enter }) => enter("AN_ACCOUNT_WITH_3_OPERATIONS_FROM_FIXTURES"))
    .when(noop)
    .then(({ application }) => application.expectNumberOfOperationsToEqual(3))
    .and(({ application }) => application.expectBalanceToEqual(55))
    .finally(done);
});

it("Should allow to add an operation", done => {
  const applicationApi: ApplicationApi = ({
    account: {
      operation: {
        addOperation: jest.fn().mockResolvedValue("OK")
      }
    }
  } as unknown) as ApplicationApi;

  const t = getTester<ApplicationState, typeof entryPoints, Dispatch, Application>({
    getStore: makeGetStore(applicationApi),
    entryPoints,
    enhancer
  });

  t.given(({ enter }) => enter("AN_ACCOUNT_WITH_3_OPERATIONS_FROM_FIXTURES"))
    .when(({ application }) => application.addOperation({ id: "id", date: new Date(), amount: 10 }))
    .then(({ application }) => application.expectNumberOfOperationsToEqual(4))
    .and(({ application }) => application.expectBalanceToEqual(65))
    .finally(done);
});

it("Should allow to remove an operation", done => {
  const applicationApi = ({
    account: {
      operation: {
        deleteOperation: jest.fn().mockResolvedValue("OK")
      }
    }
  } as unknown) as ApplicationApi;

  const t = getTester<ApplicationState, typeof entryPoints, Dispatch, Application>({
    getStore: makeGetStore(applicationApi),
    entryPoints,
    enhancer
  });

  t.given(({ enter }) => enter("AN_ACCOUNT_WITH_3_OPERATIONS_FROM_FIXTURES"))
    .when(({ application }) => application.deleteOperation(Count.first))
    .then(({ application }) => application.expectNumberOfOperationsToEqual(2))
    .and(({ application }) => application.expectBalanceToEqual(-45))
    .finally(done);
});
