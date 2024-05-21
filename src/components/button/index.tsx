import { IonButton } from "@ionic/react";
import { ReactNode } from "react";

export const Button = ({
  children,
  color = "dark",
  type = "submit",
}: {
  children: ReactNode;
  color?: HTMLIonButtonElement["color"];
  type?: HTMLIonButtonElement["type"];
}) => {
  return (
    <IonButton color={color} style={{ width: "100%" }} type={type}>
      <span style={{ textTransform: "none" }}>{children}</span>
    </IonButton>
  );
};
