import { composeWithDevTools } from "redux-devtools-extension";
import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import authReducer from "./reducers/authReducer";
import alertReducer from "./reducers/alertReducer";
import friendsReducer from "./reducers/friendsReducer";
import { auditReducer } from "./reducers/auditReducer";
import { conReducer } from "./reducers/conReducer";
import chatReducer from "./reducers/chatReducer";
import roomReducer from "./reducers/roomReducer";

const LOCAL_STORAGE_KEY = "user";

const rootReducer = combineReducers({
  auth: authReducer,
  alert: alertReducer,
  con: conReducer,
  audit: auditReducer,
  friends: friendsReducer,
  chat: chatReducer,
  room: roomReducer,
});

const loadState = () => {
  try {
    const serializedState = localStorage.getItem(LOCAL_STORAGE_KEY);
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (err) {
    console.error("Error loading User details", err);
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(LOCAL_STORAGE_KEY, serializedState);
  } catch (err) {
    console.error("Error saving User details", err);
  }
};

const store = createStore(
  rootReducer,
  loadState(),
  composeWithDevTools(applyMiddleware(thunk))
);

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
