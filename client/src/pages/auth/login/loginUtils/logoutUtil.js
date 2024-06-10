import { logout } from "../../../../store/actions/AuthActions";
import { default as axios } from "../../../../api";

export const logoutUtil = async () => {
  try {
    await axios.get(`/api/logout`);
  } catch (err) {
    console.error(err);
  }

  logout();
  localStorage.clear();
  window.location.assign("/");
};
