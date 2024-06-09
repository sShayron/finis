import * as yup from "yup";

export interface MetaForm {
  nome: string;
  descricao: string;
  valor: string;
  categoria: string;
}

export const schema = yup.object().shape({
  nome: yup.string().required("Insira um nome para sua meta"),
  descricao: yup.string().required("Insira uma descrição para sua meta"),
  valor: yup.string().required("Insira o valor da sua meta"),
  categoria: yup.string().required("Insira a categoria da sua meta"),
});
