import thunk from "redux-thunk";
import configureStore, { MockStoreEnhanced } from "redux-mock-store";
import { ApplicationState } from "../business/state";
import { ExtendedDispatch, ExtraArgument } from "../business/definitions";
import { RecursivePartial } from "./recursivePartial";

export function mockStore(
  extraArgument: RecursivePartial<ExtraArgument>,
  initialState: ApplicationState
): MockStoreEnhanced<ApplicationState, ExtendedDispatch> {
  const middlewares = [thunk.withExtraArgument(extraArgument)];
  return configureStore<ApplicationState, ExtendedDispatch>(middlewares)(initialState);
}

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
