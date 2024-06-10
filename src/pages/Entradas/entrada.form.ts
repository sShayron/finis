import * as yup from "yup";

export interface EntradaForm {
  descricao: string;
  valor: string;
  recorrencia: string;
  periodo: string;
  categoria: string;
}

export const schema = yup.object().shape({
  descricao: yup.string().required("Insira uma descrição para sua entrada"),
  valor: yup.string().required("Insira o valor da sua entrada"),
  recorrencia: yup.string().required("Insira a recorrencia da entrada"),
  periodo: yup.string().required("Insira o periodo da sua entrada"),
  categoria: yup.string().required("Insira a categoria da sua entrada"),
});
