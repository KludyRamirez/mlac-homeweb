import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import authReducer from "./reducers/AuthReducers";
import notificationsReducer from "./reducers/NotificationReducers";

const rootReducer = combineReducers({
  auth: authReducer,
  notifications: notificationsReducer,
});

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("notifications");
    return serializedState
      ? { notifications: JSON.parse(serializedState) }
      : undefined;
  } catch (err) {
    console.error("Error loading notifications", err);
    return undefined;
  }
};

// Save state function
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state.notifications);
    localStorage.setItem("notifications", serializedState);
  } catch (err) {
    console.error("Error saving notifications", err);
  }
};

const ReduxStore = createStore(
  rootReducer,
  loadState(),
  composeWithDevTools(applyMiddleware(thunk))
);

ReduxStore.subscribe(() => {
  saveState(ReduxStore.getState());
});

export default ReduxStore;
