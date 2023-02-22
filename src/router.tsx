import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import BaseLayout from "./layouts/BaseLayout";
import MainLayout from "./layouts/mainLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import StartTest from "./pages/StartTest";

export default createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<BaseLayout />}>
      <Route path="dashboard" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="test" element={<StartTest />} />
      </Route>
      <Route path="auth" element={<AuthLayout />}>
        <Route index element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);
