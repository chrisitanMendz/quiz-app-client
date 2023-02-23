import { FormikHelpers, FormikValues } from "formik";
import axiosInstance from "../utils/Axios";
import { Dispatch, AnyAction } from "redux";

interface test {
  testNo: number;
  correct: number;
  score: number;
}

interface User {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  tests?: test[];
}

interface UserAccount {
  accessToken?: string;
  user: User;
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

export const getUpdatedTests = async (email: string, dispatch: Dispatch<AnyAction>) => {
  try {
    const res: test[] = await axiosInstance.post("auth/gettests", { email });
    dispatch({ type: "UPDATE_USER_TESTS", payload: res });
  } catch (error) {
    console.log(error);
  }
};
