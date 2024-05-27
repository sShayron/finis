import {
  IonCheckbox,
  IonContent,
  IonLoading,
  IonPage,
  IonRouterLink,
  IonText,
  useIonRouter,
} from "@ionic/react";
import { mailOutline, eyeOffOutline } from "ionicons/icons";
import {
  InputWithIcon,
  GoogleIcon,
  FacebookIcon,
  XIcon,
  Button,
} from "@components";
import "./styles.css";
import { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useAuth, useToast } from "@providers";
import { LoginForm, schema } from "./login.form";
import { yupResolver } from "@hookform/resolvers/yup";
import logo from "../../components/logo.png";

export const Login = () => {
  const router = useIonRouter();
  const [loading, setLoading] = useState(false);
  const { login, checkAuthentication } = useAuth();
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
      router.push("/in/home");
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

  useEffect(() => {
    const checkAuth = () => {
      if (checkAuthentication()) {
        router.push("/in/home");
      }
    };
    checkAuth();
  }, []);

  return (
    <IonPage className="login-page">
      <IonLoading isOpen={loading} />
      <IonContent>
        <div className="centered column ion-padding-top ion-margin">
          {/* logo row */}
          <div className="centered" style={{ width: 250, height: 250 }}>
            <img
              src={logo}
              alt="Logo"
              style={{ width: "100%", height: "100%" }}
            />
          </div>

          {/* title row */}
          <div className="centered column ion-padding-vertical ion-margin-bottom">
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
                <Button type="submit">
                  <span style={{ textTransform: "none" }}>Entrar</span>
                </Button>
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
