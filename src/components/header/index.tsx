import {
  IonBackButton,
  IonButtons,
  IonHeader,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { chevronBackOutline } from "ionicons/icons";

export const Header = ({
  title,
  backButton = false,
  defaultHref,
}: {
  title: string;
  backButton?: boolean;
  defaultHref?: string;
}) => {
  return (
    <IonHeader>
      <IonToolbar>
        {backButton && (
          <IonButtons slot="start">
            <IonBackButton
              defaultHref={defaultHref}
              icon={chevronBackOutline}
            />
          </IonButtons>
        )}
        <IonTitle size="large">{title}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};
