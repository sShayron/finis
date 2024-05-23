import { IonButton, IonIcon, useIonRouter } from "@ionic/react";
import "./styles.css";
import { homeOutline, newspaperOutline, personOutline } from "ionicons/icons";

export const BottomTabs = () => {
  const router = useIonRouter();
  return (
    <div className="bottom-tabs">
      <IonButton color="medium" fill="clear">
        <div className="d-flex column align-center gap-2">
          <IonIcon size="large" icon={newspaperOutline} />
          <span style={{ textTransform: "none" }}>Histórico</span>
        </div>
      </IonButton>
      <div className="center-button">
        <IonButton color="dark" shape="round">
          <IonIcon slot="icon-only" icon={homeOutline}></IonIcon>
        </IonButton>
      </div>
      <IonButton color="medium" fill="clear">
        <div className="d-flex column align-center gap-2">
          <IonIcon size="large" icon={personOutline} />
          <span style={{ textTransform: "none" }}>Conta</span>
        </div>
      </IonButton>
    </div>
  );
};
