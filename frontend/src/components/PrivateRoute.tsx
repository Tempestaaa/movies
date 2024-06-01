import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

const PrivateRoute = () => {
  const location = useLocation();
  const { userInfo } = useAppSelector((state) => state.auth);
  return userInfo ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
