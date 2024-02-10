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

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("reduxState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("reduxState", serializedState);
  } catch (err) {
    console.log("Error saving User details", err);
  }
};

const rootReducer = combineReducers({
  auth: authReducer,
  alert: alertReducer,
  con: conReducer,
  audit: auditReducer,
  friends: friendsReducer,
  chat: chatReducer,
  room: roomReducer,
});

// Load the initial state from localStorage
const initialState = loadState();

const store = createStore(
  rootReducer,
  initialState, // Pass the initial state here
  composeWithDevTools(applyMiddleware(thunk))
);

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
