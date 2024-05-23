import { AuthResult } from "@types";
import "./styles.css";
import { IonIcon, IonText } from "@ionic/react";
import { locationOutline, notifications, person } from "ionicons/icons";

export const UserHeader = (props: { session: AuthResult | null }) => {
  const { session } = props;
  if (!session) {
    return <></>;
  }

  return (
    <div className="user-header">
      <div className="user-wrap">
        <div className="user-photo">
          <IonIcon icon={person} size="large" />
        </div>
        <IonText>
          <b>{session.name}</b>
        </IonText>
      </div>
      <div className="location">
        <IonIcon size="medium" icon={locationOutline} />
        <IonText>Vila Velha</IonText>
      </div>
      <div className="notifications">
        <IonIcon size="large" icon={notifications} />
      </div>
    </div>
  );
};
