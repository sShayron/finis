import * as yup from "yup";

export interface DespesaForm {
  descricao: string;
  valor: string;
  recorrencia: string;
  periodo: string;
  categoria: string;
}

export const schema = yup.object().shape({
  descricao: yup.string().required("Insira uma descrição para sua despesa"),
  valor: yup.string().required("Insira o valor de sua despesa"),
  recorrencia: yup.string().required("Insira a recorrencia da despesa"),
  periodo: yup.string().required("Insira o periodo da sua despesa"),
  categoria: yup.string().required("Insira a categoria da sua despesa"),
});
