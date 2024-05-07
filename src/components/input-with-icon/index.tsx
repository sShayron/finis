import { IonIcon, IonInput } from "@ionic/react";
import "./styles.css";

export const InputWithIcon = ({
  icon,
  placeholder,
}: {
  icon: string;
  placeholder: string;
}) => {
  return (
    <div className="input-with-icon w-100">
      <IonInput
        className="login-input"
        placeholder={placeholder}
        fill="solid"
      ></IonInput>
      <div className="icon-wrap">
        <IonIcon color="#00000080" icon={icon}></IonIcon>
      </div>
    </div>
  );
};
