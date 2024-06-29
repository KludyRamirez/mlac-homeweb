import {
  SET_STORE_NOTIFICATIONS,
  CHECK_INDICATOR,
} from "../actions/NotificationActions";

const initialState = {
  storeNotifications: [],
  indicator: false,
};

const notificationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_STORE_NOTIFICATIONS:
      return {
        ...state,
        storeNotifications: action.payload,
      };
    case CHECK_INDICATOR:
      const hasUnseenNotifications = action.payload.some(
        (id) => !state.storeNotifications.some((notif) => notif._id === id)
      );
      return {
        ...state,
        indicator: hasUnseenNotifications,
      };
    default:
      return state;
  }
};

export default notificationsReducer;
