import { IonButton, IonIcon } from "@ionic/react";
import { PropsWithChildren } from "react";
import "./styles.css";

export const CardButton: React.FC<PropsWithChildren<{ icon: string }>> = ({
  children,
  icon,
}) => {
  return (
    <div className="card-button">
      <IonButton>
        <div className="card-button-inner">
          <IonIcon size="large" icon={icon} />
          {children}
        </div>
      </IonButton>
    </div>
  );
};
