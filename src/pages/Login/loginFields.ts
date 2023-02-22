import Input from "../../components/Input";

const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const loginFields = [
  {
    component: Input,
    name: "email",
    id: "email-address",
    type: "email",
    "data-value": "",
    autoComplete: "email",
    placeholder: "Email",
    validate: (value: string) => {
      if (!value) {
        return "Email is required!";
      }
      if (!validateEmail(value)) {
        return "This is not a valid email";
      }
      return "";
    },
  },
  {
    component: Input,
    name: "password",
    id: "password",
    type: "password",
    "data-value": "",
    autoComplete: "password",
    placeholder: "Password",
    validate: (value: string) => {
      if (!value) {
        return "Password is required";
      }
      return "";
    },
  },
];

export const loginInitialValues = loginFields.reduce(
  (p, c) => ({ ...p, [c.name]: c["data-value"] }),
  {}
);
