import React, { useState } from "react";
import {
  IonContent,
  IonPage,
  IonDatetime,
  IonDatetimeButton,
  IonModal,
  IonLabel,
} from "@ionic/react";
import { useIonRouter } from "@ionic/react";
import "./styles.css";
import { Button, Header, InputWithIcon } from "@components";
import { yupResolver } from "@hookform/resolvers/yup";
import { MetaForm, schema } from "../meta.form";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { cashOutline, pencilOutline } from "ionicons/icons";
import { AuthService } from "@services";
import { useClient, useToast } from "@providers";

export const NovaMeta = () => {
  const router = useIonRouter();
  const { client, banks } = useClient();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const form = useForm<MetaForm, MetaForm>({
    defaultValues: {
      title: "",
      description: "",
      dateLimit: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<MetaForm> = async (data) => {
    try {
      setLoading(true);
      console.log(data);
      await client?.post("/goal", { ...data, bankId: banks[0].id });
      router.push("/in/metas");
      toast.show("Meta adicionada com sucesso!", "success");
    } catch (e) {
      console.error(e);
      toast.show("Erro ao adicionar meta!", "danger");
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
      <Header title="Adicionar Meta" defaultHref="/in/metas" backButton />
      <IonContent>
        <div className="ion-margin">
          <FormProvider {...form}>
            <form
              className="w-100"
              onSubmit={form.handleSubmit(onSubmit, onInvalid)}
            >
              <InputWithIcon
                label="Titulo"
                name="title"
                placeholder="Digite o titulo"
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

              <div className="mb-2">
                <IonLabel>Data limite</IonLabel>
              </div>
              <div className="mb-2">
                <IonDatetimeButton datetime="datetime"></IonDatetimeButton>

                <IonModal keepContentsMounted={true}>
                  <IonDatetime
                    id="datetime"
                    name="dateLimit"
                    onIonChange={(e: any) => {
                      console.log(e);
                      form.setValue("dateLimit", e.detail.value!);
                    }}
                  ></IonDatetime>
                </IonModal>
              </div>
              <Button type="submit">Incluir Meta</Button>
            </form>
          </FormProvider>
        </div>
      </IonContent>
    </IonPage>
  );
};
