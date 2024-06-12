import * as yup from "yup";

export interface MetaForm {
  title: string;
  description: string;
  dateLimit: string;
}

export const schema = yup.object().shape({
  title: yup.string().required("Insira um titulo para sua meta"),
  description: yup.string().required("Insira uma descrição para sua meta"),
  dateLimit: yup.string().required("Insira a data limite da sua meta"),
});
