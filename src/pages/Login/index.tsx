import {
  IonButton,
  IonCheckbox,
  IonContent,
  IonIcon,
  IonLoading,
  IonPage,
  IonRouterLink,
  IonText,
} from "@ionic/react";
import { cashOutline, mailOutline, eyeOffOutline } from "ionicons/icons";
import { InputWithIcon, GoogleIcon, FacebookIcon, XIcon } from "@components";
import "./styles.css";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useAuth, useToast } from "@providers";
import { LoginForm, schema } from "./login.form";
import { yupResolver } from "@hookform/resolvers/yup";

export const Login = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { show } = useToast();
  const form = useForm<LoginForm>({
    resolver: yupResolver(schema),
    resetOptions: { keepErrors: false },
  });
  const { handleSubmit } = form;

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    try {
      setLoading(true);
      await login(data);
      show("Usuário autenticado com sucesso!", "success");
    } catch (e) {
      show("Erro ao efetuar login", "danger");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const onInvalid = () => {
    show("Preencha email e senha para efetuar o login", "danger");
  };

  return (
    <IonPage className="login-page">
      <IonLoading isOpen={loading} />
      <IonContent>
        <div className="centered column ion-padding-top ion-margin">
          {/* icon row */}
          <div
            className="centered"
            style={{ width: 200, height: 175, background: "#D9D9D9" }}
          >
            <IonIcon size="large" color="primary" icon={cashOutline} />
          </div>

          {/* title row */}
          <div className="centered column ion-padding-vertical ion-margin-bottom">
            <IonText color="dark">
              <h1>Finis</h1>
            </IonText>

            <IonText color="medium">
              <span>Entre com seu e-mail e senha cadastrados</span>
            </IonText>
          </div>
          <FormProvider {...form}>
            <form
              className="w-100"
              onSubmit={handleSubmit(onSubmit, onInvalid)}
            >
              {/* inputs row */}
              <div className="centered column w-100">
                <InputWithIcon
                  placeholder="E-mail"
                  name="email"
                  icon={mailOutline}
                />
                <InputWithIcon
                  placeholder="Senha"
                  name="password"
                  icon={eyeOffOutline}
                  type="password"
                />
              </div>

              {/* checkbox e esqueceu senha row */}
              <div className="d-flex justify-between w-100">
                <div>
                  <IonCheckbox
                    style={{ fontSize: ".9rem" }}
                    labelPlacement="end"
                  >
                    Lembrar credenciais
                  </IonCheckbox>
                </div>
                <div>
                  <IonRouterLink
                    color="dark"
                    style={{ fontWeight: "bold", fontSize: ".9rem" }}
                    href=""
                  >
                    Esqueceu a senha?
                  </IonRouterLink>
                </div>
              </div>

              {/* or row */}
              <div className="or centered w-100">
                <span>ou</span>
              </div>

              {/* socials row */}
              <div className="d-flex justify-center" style={{ gap: "3rem" }}>
                <GoogleIcon />
                <FacebookIcon />
                <XIcon />
              </div>

              {/* sign in button row */}
              <div className="w-100" style={{ marginTop: "2rem" }}>
                <IonButton
                  color="dark ion-vertical-margin"
                  style={{ width: "100%" }}
                  type="submit"
                >
                  <span style={{ textTransform: "none" }}>Entrar</span>
                </IonButton>
                <div className="d-flex justify-center ion-margin-top">
                  <span>Não tem uma conta? </span>
                  <span>&nbsp;</span>
                  <IonRouterLink
                    color="primary"
                    style={{ fontWeight: "bold", fontSize: ".9rem" }}
                    href="/registrar"
                  >
                    Cadastre-se
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
