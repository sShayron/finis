import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonSegment, IonSegmentButton, IonLabel, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon, IonGrid, IonRow, IonCol, IonButton, IonInput, IonText, IonSelect, IonSelectOption } from '@ionic/react';
import { useIonRouter } from '@ionic/react';
import './styles.css';
import { Button, Header, InputWithIcon } from "@components";
import { yupResolver } from '@hookform/resolvers/yup';
import { EntradaForm, schema } from '../entrada.form';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { calendarOutline, cashOutline, eyeOffOutline, mailOutline, pencilOutline, personOutline } from 'ionicons/icons';
import { AuthService } from '@services';
import { useClient } from '@providers';

export const NovaEntrada = () => {
  const router = useIonRouter();
  const { client } = useClient();
  const [loading, setLoading] = useState(false);
  const [recorrencia, setRecorrencia] = useState('Única');
  const form = useForm<EntradaForm, EntradaForm>({
    defaultValues: {
      descricao: "",
      valor: "",
      recorrencia: "",
      periodo: "",
      categoria: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<EntradaForm> = async (data) => {
    try {
      setLoading(true);
      console.log(data);
      //await client?.post(
      //  "/income-expense"
      //);
      //router.push("/in/entradas");
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const onInvalid = (e: any) => {
    console.log(e);
  };

  const handleRecorrenciaChange = (value: string) => {
    setRecorrencia(value);
  };

  useEffect(() => {
    form.setValue("recorrencia", recorrencia);
  }, [form.setValue, recorrencia]);

  return (
    <IonPage>
      <Header title="Adicionar Entrada" defaultHref="/in/entradas" backButton />
      <IonContent>
        <div className="ion-margin">
          <FormProvider {...form}>
            <form
              className="w-100"
              onSubmit={form.handleSubmit(onSubmit, onInvalid)}
            >
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
                <IonLabel>Recorrência</IonLabel>
                <IonGrid>
                  <IonRow>
                    <IonCol>
                      <IonButton expand="block" color={recorrencia === 'Única' ? 'primary' : 'medium'} onClick={() => handleRecorrenciaChange('Única')}>
                        Única
                      </IonButton>
                    </IonCol>
                    <IonCol>
                      <IonButton expand="block" color={recorrencia === 'Semanal' ? 'primary' : 'medium'} onClick={() => handleRecorrenciaChange('Semanal')}>
                        Semanal
                      </IonButton>
                    </IonCol>
                    <IonCol>
                      <IonButton expand="block" color={recorrencia === 'Mensal' ? 'primary' : 'medium'} onClick={() => handleRecorrenciaChange('Mensal')}>
                        Mensal
                      </IonButton>
                    </IonCol>
                    <IonCol>
                      <IonButton expand="block" color={recorrencia === 'Anual' ? 'primary' : 'medium'} onClick={() => handleRecorrenciaChange('Anual')}>
                        Anual
                      </IonButton>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </div>
              <div>
                <InputWithIcon
                  label="Período"
                  name="periodo"
                  placeholder="Digote o período"
                  icon={calendarOutline}
                />
              </div>
              <div>
                <IonSelect label="Categoria" placeholder="Tipo de Entrada" {...form.register("categoria")}>
                  <IonSelectOption value="imoveis">Imóveis</IonSelectOption>
                  <IonSelectOption value="investimentos">Investimentos</IonSelectOption>
                  <IonSelectOption value="salario">Salário</IonSelectOption>
                  <IonSelectOption value="veiculos">Veículos</IonSelectOption>
                  <IonSelectOption value="outros">Outros</IonSelectOption>
                </IonSelect>
              </div>
              <IonButton
                color="dark ion-vertical-margin"
                style={{ width: "100%" }}
                type="submit"
              >
                Incluir Entrada
              </IonButton>
            </form>
          </FormProvider>
        </div>
      </IonContent>
    </IonPage>
  );
};
