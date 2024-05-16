import { requiredMessage } from "@utils";
import * as yup from "yup";

export interface RegisterForm {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

// min 8 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

export const schema = yup.object().shape({
  name: yup.string().required(requiredMessage),
  email: yup.string().email().required(requiredMessage),
  phoneNumber: yup.string().required(requiredMessage),
  password: yup
    .string()
    .matches(passwordRules, {
      message:
        "Senha deve conter 8 dígitos ao menos uma letra minuscula, uma maiuscula e um número",
    })
    .required(requiredMessage),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Senhas não coincidem")
    .required(requiredMessage),
});
