import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

const BaseLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const JSONToken = JSON.parse(token);
      dispatch({ type: "LOGIN_SUCCESS", payload: JSONToken });
    }
  }, []);

  return <Outlet />;
};

export default BaseLayout;
