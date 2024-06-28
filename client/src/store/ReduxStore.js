import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import authReducer from "./reducers/AuthReducers";
import notificationsReducer from "./reducers/NotificationReducers";

const rootReducer = combineReducers({
  auth: authReducer,
  notifications: notificationsReducer,
});

const ReduxStore = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default ReduxStore;
