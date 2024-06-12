import * as yup from "yup";

export interface DespesaForm {
  title: string;
  description: string;
  value: string;
  category: string;
}

export const schema = yup.object().shape({
  title: yup.string().required("Insira o título da sua despesa"),
  description: yup.string().required("Insira uma descrição para sua despesa"),
  value: yup.string().required("Insira o valor sua despesa"),
  category: yup.string().required("Insira a categoria da sua despesa"),
});
