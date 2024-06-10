import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import AuthReducer from "./reducers/AuthReducers";

const rootReducer = combineReducers({
  auth: AuthReducer,
});

const ReduxStore = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default ReduxStore;
