import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

const AdminRoute = () => {
  const location = useLocation();
  const { userInfo } = useAppSelector((state) => state.auth);
  return userInfo?.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default AdminRoute;
