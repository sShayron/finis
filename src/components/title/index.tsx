import { IonText } from "@ionic/react";
import { PropsWithChildren } from "react";

export const Title: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <IonText color="dark">
      <b>{children}</b>
    </IonText>
  );
};
