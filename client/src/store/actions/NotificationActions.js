export const SET_STORE_NOTIFICATIONS = "SET_STORE_NOTIFICATIONS";
export const CHECK_INDICATOR = "CHECK_INDICATOR";

export const setStoreNotifications = (notifications) => ({
  type: SET_STORE_NOTIFICATIONS,
  payload: notifications,
});

export const checkIndicator = (currentIds) => ({
  type: CHECK_INDICATOR,
  payload: currentIds,
});
