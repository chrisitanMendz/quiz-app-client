import React from "react";
import { FieldProps } from "formik";

const Input: React.FC<FieldProps> = (props) => {
  const {
    field, // { name, value, onChange, onBlur }
    form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    ...rest
  } = props;

  return (
    <div className="flex flex-col relative mt-3 mx-auto max-w-md">
      <input
        className="bg-white text-prim-color text-sm outline-none w-full px-4 py-2 rounded-lg shadow-sm"
        {...field}
        {...rest}
      />
      {touched[field.name] && errors[field.name] && (
        <p className="text-red-500 text-xs font-semibold text-right mr-2">
          {String(errors[field.name])}
        </p>
      )}
    </div>
  );
};

export default Input;
