import { useLocation, Navigate, Outlet } from "react-router-dom";

const SecureRoles = ({ allowedRoles, auth }) => {
  const location = useLocation();

  return allowedRoles?.find((ar) => auth?.userDetails?.role?.includes(ar)) ? (
    <Outlet />
  ) : auth?.userDetails?.token ? (
    <Navigate to="/statistics" state={{ from: location }} replace />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default SecureRoles;
