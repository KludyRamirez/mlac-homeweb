import { useEffect } from "react";
import { connect } from "react-redux";
import { getActions } from "../store/actions/authActions";

const PersistLogin = ({ refreshToken }) => {
  useEffect(() => {
    const handleRefresh = async () => {
      try {
        await refreshToken();
        // Do something after refreshing the token if needed
      } catch (error) {
        // Handle error, e.g., redirect to login page
      }
    };
  }, []);
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(null, mapActionsToProps)(PersistLogin);
