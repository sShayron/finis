import {
  IonButton,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonLoading,
  IonPage,
  IonText,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import { InputWithIcon } from "../../components";
import {
  eyeOffOutline,
  mailOutline,
  personOutline,
  phonePortraitOutline,
} from "ionicons/icons";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { AuthService } from "../../services/auth-service";

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
}

export const Register = () => {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [msg, setMsg] = useState("Preencha todos os dados");
  const [toastColor, setToastColor] = useState("danger");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>();
  const onSubmit: SubmitHandler<RegisterForm> = async (data) => {
    console.log(data);
    try {
      setLoading(true);
      await AuthService.signUp(data);
      setToastColor("success");
      setMsg("Usuário criado com sucesso!");
      setIsOpen(true);
    } catch (e) {
      setMsg("Erro ao criar usuário");
      setIsOpen(true);
      setToastColor("danger");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage className="register-page">
      <IonLoading isOpen={loading} />
      <IonToast
        position="top"
        isOpen={isOpen}
        message={msg}
        duration={5000}
        color={toastColor}
        onDidDismiss={() => setIsOpen(false)}
      ></IonToast>
      <IonHeader>
        <IonToolbar>
          <IonTitle size="large">Registrar</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="ion-margin">
          <form className="w-100" onSubmit={handleSubmit(onSubmit)}>
            <IonText>
              <h4>Criando sua conta gratuitamente</h4>
            </IonText>
            {/* inputs row */}
            <div className="centered column w-100 ion-padding-top">
              <InputWithIcon
                name="name"
                register={register}
                placeholder="Nome completo"
                icon={personOutline}
              />
              <InputWithIcon
                name="email"
                register={register}
                placeholder="E-mail"
                icon={mailOutline}
              />
              <InputWithIcon
                name="phoneNumber"
                register={register}
                placeholder="(00) 0000-0000"
                icon={phonePortraitOutline}
              />
              <InputWithIcon
                type="password"
                name="password"
                register={register}
                placeholder="Senha"
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
            <div className="">
              <IonButton
                color="dark ion-vertical-margin"
                style={{ width: "100%" }}
                type="submit"
              >
                <span style={{ textTransform: "none" }}>Enviar</span>
              </IonButton>
            </div>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};
