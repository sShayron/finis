import { IonIcon, IonRouterLink, IonText } from "@ionic/react";
import { CardProgressContainer } from "./styles";
import { addOutline } from "ionicons/icons";

export const CardProgressEmpty = () => {
  return (
    <CardProgressContainer>
      <IonRouterLink href="/in/metas" color="dark">
        <div className="d-flex column">
          <IonText>
            <span style={{ fontSize: "0.75rem" }}>Nova meta</span>
          </IonText>
          <IonIcon style={{ fontSize: "3rem" }} icon={addOutline} />
        </div>
      </IonRouterLink>
    </CardProgressContainer>
  );
};
