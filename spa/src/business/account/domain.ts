import { Account } from "./model";
import { createGenericDomain, GenericDomain } from "redux-generic";

export const accountDomain: GenericDomain<Account> = createGenericDomain("ACCOUNT");
