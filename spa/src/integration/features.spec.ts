import { getTester, noop } from "redux-integration-testing";
import { Dispatch } from "redux";
import { ApplicationState } from "../business/state";
import { entryPoints } from "./entryPoints";
import { Application, enhancer, Count } from "./pageModel";
import { makeGetStore } from "../store";
import { ApplicationApi } from "../business/api";
import { mockObject } from "../util/mockObject";

it("Balance should equal 0 when there is no operation", done => {
  const applicationApi = mockObject<ApplicationApi>({});

  const t = getTester<ApplicationState, typeof entryPoints, Dispatch, Application>({
    getStore: makeGetStore(applicationApi),
    entryPoints,
    enhancer
  });

  t.given(({ enter }) => enter("AN_APPLICATION_WITH_A_SINGLE_ACCOUNT_AND_NO_OPERATION"))
    .when(noop)
    .then(({ application }) => application.onAccount(Count.first).expectBalanceToEqual(0))
    .finally(done);
});

it("Should allow to add operations and update balance accordingly", done => {
  const applicationApi = mockObject<ApplicationApi>({
    addOperation: jest.fn().mockResolvedValue("OK")
  });

  const t = getTester<ApplicationState, typeof entryPoints, Dispatch, Application>({
    getStore: makeGetStore(applicationApi),
    entryPoints,
    enhancer
  });

  t.given(({ enter }) => enter("AN_APPLICATION_WITH_A_SINGLE_ACCOUNT_AND_NO_OPERATION"))
    .when(async ({ application }) => {
      await application.onAccount(Count.first).addOperation({ id: "0", date: new Date(), amount: 100 });
      await application.onAccount(Count.first).addOperation({ id: "1", date: new Date(), amount: 50 });
      await application.onAccount(Count.first).addOperation({ id: "2", date: new Date(), amount: -30 });
    })
    .then(({ application }) => application.onAccount(Count.first).expectNumberOfOperationsToEqual(3))
    .and(({ application }) => application.onAccount(Count.first).expectBalanceToEqual(120))
    .finally(done);
});

it("Should allow to delete operations and update balance accordingly", done => {
  const applicationApi = mockObject<ApplicationApi>({
    addOperation: jest.fn().mockResolvedValue("OK"),
    deleteOperation: jest.fn().mockResolvedValue("OK")
  });

  const t = getTester<ApplicationState, typeof entryPoints, Dispatch, Application>({
    getStore: makeGetStore(applicationApi),
    entryPoints,
    enhancer
  });

  t.given(({ enter }) => enter("AN_APPLICATION_WITH_A_SINGLE_ACCOUNT_AND_NO_OPERATION"))
    .and(async ({ application }) => {
      await application.onAccount(Count.first).addOperation({ id: "0", date: new Date(), amount: 100 });
      await application.onAccount(Count.first).addOperation({ id: "1", date: new Date(), amount: 50 });
      await application.onAccount(Count.first).addOperation({ id: "2", date: new Date(), amount: -30 });
    })
    .when(async ({ application }) => await application.onAccount(Count.first).deleteOperation("0"))
    .then(({ application }) => application.onAccount(Count.first).expectNumberOfOperationsToEqual(2))
    .and(({ application }) => application.onAccount(Count.first).expectBalanceToEqual(20))
    .finally(done);
});
