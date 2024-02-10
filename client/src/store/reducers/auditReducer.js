export const auditReducer = (state = false, action) => {
  switch (action.type) {
    case "AUDIT":
      return action.payload;
    default:
      return state;
  }
};
