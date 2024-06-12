import { IonButton } from "@ionic/react";
import { ReactNode } from "react";

export const Button = ({
  children,
  color = "dark",
  type = "submit",
  onClick,
}: {
  children: ReactNode;
  color?: HTMLIonButtonElement["color"];
  type?: HTMLIonButtonElement["type"];
  onClick?: () => void;
}) => {
  return (
    <IonButton
      color={color}
      style={{ width: "100%" }}
      type={type}
      onClick={onClick}
    >
      <span style={{ textTransform: "none" }}>{children}</span>
    </IonButton>
  );
};
