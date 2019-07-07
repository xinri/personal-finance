import { Operation } from "./model";

const operation0: Operation = {
  id: "1e61de81-9351-4c44-8631-734d061ee2c0",
  accountId: "accountId",
  date: new Date(2019, 5, 12),
  amount: 100
};

const operation1: Operation = {
  id: "f85cce23-f62c-4370-a375-03d3a214e1be",
  accountId: "accountId",
  date: new Date(2019, 5, 13),
  amount: -40
};

const operation2: Operation = {
  id: "bdef40f1-e5fe-4050-aee8-f2254c9d6dc9",
  accountId: "accountId",
  date: new Date(2019, 10, 21),
  amount: -5
};

const operations: Operation[] = [operation0, operation1, operation2];

export const operationFixtures = {
  operation0,
  operation1,
  operation2,
  operations
};
