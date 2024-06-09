import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonButton, IonSelect, IonSelectOption } from '@ionic/react';
import { useIonRouter } from '@ionic/react';
import './styles.css';
import { Button, Header, InputWithIcon } from "@components";
import { yupResolver } from '@hookform/resolvers/yup';
import { MetaForm, schema } from '../meta.form';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import {cashOutline, pencilOutline} from 'ionicons/icons';
import { AuthService } from '@services';
import { useClient } from '@providers';

export const NovaMeta = () => {
  const router = useIonRouter();
  const { client } = useClient();
  const [loading, setLoading] = useState(false);
  const form = useForm<MetaForm, MetaForm>({
    defaultValues: {
      nome: "",
      descricao: "",
      valor: "",
      categoria: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<MetaForm> = async (data) => {
    try {
      setLoading(true);
      console.log(data);
      //await client?.post(
      //  "/income-expense"
      //);
      //router.push("/in/metas");
    } catch (e) {
      console.error(e);
    } finally {
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
              <div>
                <InputWithIcon
                  label="Nome"
                  name="nome"
                  placeholder="Digite o nome"
                  icon={pencilOutline}
                />
              </div>
              <div>
                <InputWithIcon
                  label="Descrição"
                  name="descricao"
                  placeholder="Digite a descrição"
                  icon={pencilOutline}
                />
              </div>
              <div>
                <InputWithIcon
                  label="Valor"
                  name="valor"
                  placeholder="R$ 00,00"
                  icon={cashOutline}
                />
              </div>
              <div>
                <IonSelect label="Categoria" placeholder="Tipo da Meta" {...form.register("categoria")}>
                  <IonSelectOption value="educacao">Educação</IonSelectOption>
                  <IonSelectOption value="empreendimento">Empreendimento</IonSelectOption>
                  <IonSelectOption value="imovel">Imóvel</IonSelectOption>
                  <IonSelectOption value="investimento">Investimento</IonSelectOption>
                  <IonSelectOption value="saude">Saúde</IonSelectOption>
                  <IonSelectOption value="veiculo">Veículo</IonSelectOption>
                  <IonSelectOption value="viagem">Viagem</IonSelectOption>
                </IonSelect>
              </div>
              <IonButton
                color="dark ion-vertical-margin"
                style={{ width: "100%" }}
                type="submit"
              >
                Incluir Meta
              </IonButton>
            </form>
          </FormProvider>
        </div>
      </IonContent>
    </IonPage>
  );
};
