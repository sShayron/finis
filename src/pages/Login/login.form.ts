import * as yup from "yup";

export interface LoginForm {
  email: string;
  password: string;
}

export const schema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required("Insira seu e-mail para efetuar o login"),
  password: yup.string().required("Insira sua senha para efetuar o login"),
});
