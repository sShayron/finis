import { IonIcon, IonInput } from "@ionic/react";
import "./styles.css";
import { UseFormRegister } from "react-hook-form";

export const InputWithIcon = ({
  icon,
  placeholder,
  name,
  register,
  type = "text",
}: {
  icon: string;
  placeholder: string;
  name: string;
  register: UseFormRegister<any>;
  type?: HTMLIonInputElement["type"];
}) => {
  return (
    <div className="input-with-icon w-100">
      <IonInput
        type={type}
        className="login-input"
        placeholder={placeholder}
        fill="solid"
        {...register(name)}
      ></IonInput>
      <div className="icon-wrap">
        <IonIcon color="#00000080" icon={icon}></IonIcon>
      </div>
    </div>
  );
};
