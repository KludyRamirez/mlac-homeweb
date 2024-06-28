let initialState = [];

if (typeof window !== "undefined") {
  if (localStorage.getItem("notifications")) {
    initialState = JSON.parse(localStorage.getItem("notifications"));
  } else {
    initialState = [];
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NOTIFICATIONS":
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
