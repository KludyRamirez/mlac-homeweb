let initialState = [];

if (typeof window !== "undefined") {
  if (localStorage.getItem("con")) {
    initialState = JSON.parse(localStorage.getItem("con"));
  } else {
    initialState = [];
  }
}

export const conReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CON":
      return action.payload;
    default:
      return state;
  }
};
