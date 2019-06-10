import { Operation } from "./model";

const operation0: Operation = {
  id: "6a9542d0-a0f7-4c75-a476-8949ad425fde",
  date: new Date(2019, 5, 12),
  amount: 100
};

const operation1: Operation = {
  id: "8197554e-0819-47b6-a06a-9f6abfc5f2ad",
  date: new Date(2019, 5, 13),
  amount: -40
};

const operation2: Operation = {
  id: "bc4a3c17-891f-406c-9757-9ddba98d3efb",
  date: new Date(2019, 10, 21),
  amount: -5
};

const anotherOperation: Operation = {
  id: "2515c7f1-102e-46ec-9c65-4b7193017c4b",
  date: new Date(2019, 10, 22),
  amount: 10
};

const operations: Operation[] = [operation0, operation1, operation2];

export const operationFixtures = {
  operation0,
  operation1,
  operation2,
  operations,
  anotherOperation
};
