import { Operation } from "./model";
import { createGenericDomain, GenericDomain } from "redux-generic";

export const operationDomain: GenericDomain<Operation> = createGenericDomain("OPERATION");
