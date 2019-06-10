import { OperationApi } from "./operation/thunks";
import { operationApi } from "./operation/api";

export type ApplicationApi = OperationApi;

export const applicationApi: ApplicationApi = {
  ...operationApi
};
