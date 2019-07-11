import { createStore, applyMiddleware, Middleware, Store } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer } from "./business/reducer";
import { enableBatching } from "redux-batched-actions";
import { ExtraArgument } from "./business/definitions";
import { applicationThunksCreators } from "./business/thunks";
import { applicationSelectors } from "./business/selectors";

export function makeGetStore() {
  return function getStore(...additionalMiddlewares: Middleware[]): Store {
    const extraArgument: ExtraArgument = {
      thunkCreators: applicationThunksCreators,
      selectors: applicationSelectors
    };
    const thunkMiddleware: Middleware = thunk.withExtraArgument(extraArgument);
    const middlewares: Middleware[] = [thunkMiddleware, ...additionalMiddlewares];
    return createStore(enableBatching(rootReducer), composeWithDevTools(applyMiddleware(...middlewares)));
  };
}
