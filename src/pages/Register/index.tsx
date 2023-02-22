import { registerFields, registerInitialValues } from "./registerFields";
import CustomForm from "../../components/CustomForm";
import { Link } from "react-router-dom";
import { register } from "../../actions/authActions";
import { FormikHelpers, FormikValues } from "formik";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();

  const submit = (
    values: FormikValues,
    actions: FormikHelpers<FormikValues>
  ) => {
    register(values, actions, dispatch);
  };

  return (
    <div className="min-h-screen">
      <div className="min-h-screen flex flex-col justify-center px-5">
        <h1 className="mx-auto mb-5 text-3xl font-bold text-[#31cd63]">
          REGISTER
        </h1>
        <CustomForm
          initialValues={registerInitialValues}
          onSubmit={submit}
          fields={registerFields}
          btnText="REGISTER"
        >
          <div className="max-w-md mx-auto my-5 flex">
            <Link
              to="/auth"
              className="text-sm ml-auto font-semibold text-[#31CD63]"
            >
              Already have an account?
            </Link>
          </div>
        </CustomForm>
      </div>
    </div>
  );
};

export default Login;
