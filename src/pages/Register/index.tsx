import {
  IonButton,
  IonCheckbox,
  IonContent,
  IonLoading,
  IonPage,
  IonRouterLink,
  IonText,
  useIonRouter,
} from "@ionic/react";
import { Header, InputWithIcon } from "@components";
import {
  eyeOffOutline,
  mailOutline,
  personOutline,
  phonePortraitOutline,
} from "ionicons/icons";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthService } from "@services";
import { useToast } from "@providers";
import { RegisterForm, schema } from "./register.form";

export const Register = () => {
  const router = useIonRouter();
  const [loading, setLoading] = useState(false);
  const { show } = useToast();
  const form = useForm<RegisterForm, RegisterForm>({
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(schema),
  });
  const { handleSubmit } = form;

  const onSubmit: SubmitHandler<RegisterForm> = async (data) => {
    try {
      setLoading(true);
      await AuthService.signUp(data);
      show("Usuário criado com sucesso!", "success");
      router.push("/in/tab1");
    } catch (e) {
      show("Erro ao criar usuário", "danger");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const onInvalid = (e: any) => {
    show("Preencha os campos corretamente", "danger");
    console.log(e);
  };

  return (
    <IonPage className="register-page">
      <IonLoading isOpen={loading} />
      <Header title="Registrar" defaultHref="/login" backButton />
      <IonContent>
        <div className="ion-margin">
          <FormProvider {...form}>
            <form
              className="w-100"
              onSubmit={handleSubmit(onSubmit, onInvalid)}
            >
              <IonText>
                <h4>Criando sua conta gratuitamente</h4>
              </IonText>
              {/* inputs row */}
              <div className="centered column w-100 ion-padding-top">
                <InputWithIcon
                  name="name"
                  placeholder="Nome completo"
                  icon={personOutline}
                />
                <InputWithIcon
                  name="email"
                  placeholder="E-mail"
                  icon={mailOutline}
                />
                <InputWithIcon
                  name="phoneNumber"
                  placeholder="(00) 0000-0000"
                  icon={phonePortraitOutline}
                />
                <InputWithIcon
                  type="password"
                  name="password"
                  placeholder="Senha"
                  icon={eyeOffOutline}
                />
                <InputWithIcon
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirmar senha"
                  icon={eyeOffOutline}
                />
              </div>
              <div className="ion-margin-bottom">
                <IonCheckbox style={{ fontSize: ".9rem" }} labelPlacement="end">
                  Ao selecionar você concordar com os{" "}
                  <span style={{ color: "var(--ion-color-primary)" }}>
                    Termos
                  </span>{" "}
                  e{" "}
                  <span style={{ color: "var(--ion-color-primary)" }}>
                    Condições
                  </span>
                </IonCheckbox>
              </div>
              <div className="d-flex column gap-2">
                <IonButton
                  color="dark ion-vertical-margin"
                  style={{ width: "100%" }}
                  type="submit"
                >
                  Enviar
                </IonButton>
                <div className="d-flex justify-center align-center">
                  <IonText>Já tem uma conta? </IonText>{" "}
                  <IonRouterLink
                    color="primary"
                    style={{
                      fontWeight: "bold",
                      fontSize: ".9rem",
                      paddingLeft: "0.5rem",
                    }}
                    href="/login"
                  >
                    Entrar
                  </IonRouterLink>
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
      </IonContent>
    </IonPage>
  );
};
