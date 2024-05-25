import { IonButton, IonContent, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useIonRouter } from '@ionic/react';
import './styles.css';
import { Header } from "@components";

export const Metas = () => {
  const router = useIonRouter();

  return (
    <IonPage>
      <Header title="Metas" defaultHref="/in/home" backButton />
      <IonContent className="ion-padding metas-container">
        {/* Conteúdo da página Metas */}
      </IonContent>
    </IonPage>
  );
};
