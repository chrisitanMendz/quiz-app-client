import React from "react";
import { Field, Form, Formik, FormikConfig, FormikValues } from "formik";

interface FieldType {
  name: string;
  id: string;
  type: string;
  "data-value": string;
  autoComplete: string;
  placeholder: string;
  validate: (value: string) => string;
}

interface Props {
  btnText: string;
  fields: FieldType[];
  children?: JSX.Element | JSX.Element[];
}

const CustomForm: React.FC<FormikConfig<FormikValues> & Props> = (props) => {
  const { btnText, fields, children, ...rest } = props;
  return (
    <Formik {...rest}>
      {({ isValid, errors }) => (
        <Form>
          {fields.map((item) => (
            <Field key={item.name} {...item} />
          ))}
          {errors.loginError && (
            <div className="max-w-md mx-auto">
              <p className="text-sm font-semibold text-red-500 text-center mt-3">
                {String(errors.loginError)}
              </p>
            </div>
          )}
          {children}
          <button
            type="submit"
            disabled={!isValid}
            className="w-full max-w-md py-2 text-sm text-white font-semibold rounded-lg bg-[#31CD63] mt-3 mx-auto block shadow-sm
            disabled:bg-gray-400"
          >
            {btnText}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default CustomForm;
