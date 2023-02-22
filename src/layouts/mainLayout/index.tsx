import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers/index";
import Header from "../../components/Header";

const MainLayout = () => {
  const auth = useSelector((state: RootState) => state.auth);

  if (!auth.accessToken) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="pt-14">
      <Header />
      <Outlet />
    </div>
  );
};

export default MainLayout;
