import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import { ApplicationState } from "../business/state";
import { ExtendedDispatch } from "../business/definitions";

const middlewares = [thunk];
export const mockStore = configureStore<ApplicationState, ExtendedDispatch>(middlewares);

export function mockState<S>(): S {
  return new Proxy(
    {},
    {
      get: () => mockState(),
      set: () => {
        throw new Error(`A mocked state shall not be mutated`);
      }
    }
  ) as S;
}
