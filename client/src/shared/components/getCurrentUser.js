export const getCurrentUser = async () => {
  const userLocalCardId = localStorage.getItem("user");
  if (userLocalCardId) {
    try {
      const userCardId = JSON.parse(userLocalCardId);

      if (userCardId && userCardId.cardId) {
        return userCardId.cardId;
      } else {
        console.log("Token not found within the 'user' object");
      }
    } catch (error) {
      console.error("Error parsing 'user' object:", error);
    }
  } else {
    console.log("User object not found in local storage");
  }
  return null;
};
