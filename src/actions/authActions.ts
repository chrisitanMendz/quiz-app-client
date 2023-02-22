import { FormikHelpers, FormikValues } from "formik";
import axiosInstance from "../utils/Axios";
import { Dispatch, AnyAction } from "redux";

interface UserAccount {
  accessToken?: string;
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

interface ErrorMessage {
  error?: string;
}

export const login = async (
  data: FormikValues,
  actions: FormikHelpers<FormikValues>,
  dispatch: Dispatch<AnyAction>
) => {
  try {
    const res: UserAccount & ErrorMessage = await axiosInstance.post("auth/login", data);
    if (res.error) {
      actions.setErrors({ loginError: res.error });
      return;
    }
    dispatch({ type: "LOGIN_SUCCESS", payload: res });
    localStorage.setItem("token", JSON.stringify(res));
    actions.resetForm();
  } catch (error: any) {
    actions.setErrors({ loginError: error.message });
  }
};

export const register = async (
  data: FormikValues,
  actions: FormikHelpers<FormikValues>,
  dispatch: Dispatch<AnyAction>
) => {
  const { confirmPassword, ...rest } = data;

  try {
    if (confirmPassword !== rest.password) {
      actions.setErrors({
        loginError: "Password and confirm-password should be matched!",
      });
      return;
    }
    const res: UserAccount & ErrorMessage = await axiosInstance.post("auth/register", rest);
    if (res.error) {
      actions.setErrors({ loginError: res.error });
      return;
    }
    dispatch({ type: "REGISTER_SUCCESS", payload: res });
    localStorage.setItem("token", JSON.stringify(res));
    actions.resetForm();
  } catch (error: any) {
    actions.setErrors({ loginError: error.message });
  }
};
