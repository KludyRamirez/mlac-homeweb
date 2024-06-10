import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

import useRefreshToken from "./useRefreshToken";
import Loading from "./Loading";

const PersistLogin = ({ auth }) => {
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useRefreshToken();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    !auth?.userDetails?.token ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  return <>{isLoading ? <Loading /> : <Outlet />}</>;
};

export default PersistLogin;
