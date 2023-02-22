import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../../reducers/index";

const AuthLayout = () => {
  const auth = useSelector((state: RootState) => state.auth);

  if (auth.accessToken) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default AuthLayout;
