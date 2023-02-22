import { loginFields, loginInitialValues } from "./loginFields";
import CustomForm from "../../components/CustomForm";
import { Link } from "react-router-dom";
import { login } from "../../actions/authActions";
import { FormikHelpers, FormikValues } from "formik";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();

  const submit = (
    values: FormikValues,
    actions: FormikHelpers<FormikValues>
  ) => {
    login(values, actions, dispatch);
  };

  return (
    <div className="min-h-screen">
      <div className="min-h-screen flex flex-col justify-center px-5">
        <h1 className="mx-auto mb-5 text-3xl font-bold text-[#31cd63]">
          LOGIN
        </h1>
        <CustomForm
          initialValues={loginInitialValues}
          onSubmit={submit}
          fields={loginFields}
          btnText="LOGIN"
        >
          <div className="max-w-md mx-auto my-5 flex">
            <input type="checkbox" />
            <label className="text-sm ml-1">Remember me</label>
            <Link
              to="register"
              className="text-sm ml-auto font-semibold text-[#31CD63]"
            >
              Dosn't have an account?
            </Link>
          </div>
        </CustomForm>
      </div>
    </div>
  );
};

export default Login;
