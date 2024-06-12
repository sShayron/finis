import { useState } from "react";
import { IonContent, IonPage, IonSelect, IonSelectOption } from "@ionic/react";
import { useIonRouter } from "@ionic/react";
import "./styles.css";
import { Button, Header, InputWithIcon } from "@components";
import { yupResolver } from "@hookform/resolvers/yup";
import { DespesaForm, schema } from "../despesa.form";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { cashOutline, pencilOutline } from "ionicons/icons";
import { useClient, useToast } from "@providers";

export const NovaDespesa = () => {
  const router = useIonRouter();
  const { client, banks } = useClient();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const form = useForm<DespesaForm, DespesaForm>({
    defaultValues: {
      description: "",
      value: "",
      category: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<DespesaForm> = async (data) => {
    try {
      if (loading) return;
      setLoading(true);
      console.log(data);
      await client?.post("/income-expense", {
        ...data,
        bankId: banks[0].id,
        type: "expense",
      });
      toast.show("Despesa adicionada com sucesso!", "success");
      router.push("/in/despesas");
    } catch (e) {
      console.error(e);
      toast.show("Erro ao cadastrar despesa!", "danger");
    } finally {
      form.reset();
      setLoading(false);
    }
  };

  const onInvalid = (e: any) => {
    console.log(e);
  };

  return (
    <IonPage>
      <Header title="Adicionar Despesa" defaultHref="/in/despesas" backButton />
      <IonContent>
        <div className="ion-margin">
          <FormProvider {...form}>
            <form
              className="w-100"
              onSubmit={form.handleSubmit(onSubmit, onInvalid)}
            >
              <InputWithIcon
                label="Titulo"
                placeholder="Digite o título da despesa"
                name="title"
                icon={pencilOutline}
              />
              <InputWithIcon
                label="Descrição"
                name="description"
                placeholder="Digite a descrição"
                icon={pencilOutline}
              />
              <InputWithIcon
                label="Valor"
                name="value"
                placeholder="R$ 00,00"
                icon={cashOutline}
              />
              <div>
                <IonSelect
                  label="Categoria"
                  placeholder="Tipo de Despesa"
                  {...form.register("category")}
                >
                  <IonSelectOption value="agua">Água</IonSelectOption>
                  <IonSelectOption value="alimentacao">
                    Alimentação
                  </IonSelectOption>
                  <IonSelectOption value="energia">Energia</IonSelectOption>
                  <IonSelectOption value="internet">Internet</IonSelectOption>
                  <IonSelectOption value="moradia">Moradia</IonSelectOption>
                  <IonSelectOption value="veiculos">Veículos</IonSelectOption>
                  <IonSelectOption value="outros">Outros</IonSelectOption>
                </IonSelect>
              </div>
              <Button type="submit">Incluir Despesa</Button>
            </form>
          </FormProvider>
        </div>
      </IonContent>
    </IonPage>
  );
};
