import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import { ExploreContainer, UserHeader } from "@components";
import { useSession } from "@providers";
import { CardButton } from "src/components/card-button";
import { receiptOutline } from "ionicons/icons";

export const Home: React.FC = () => {
  const router = useIonRouter();
  const { session } = useSession();
  return (
    <IonPage>
      <UserHeader session={session} />
      <IonContent fullscreen>
        <CardButton
          icon={receiptOutline}
          onClick={() => router.push("/in/despesas")}
        >
          Despesas
        </CardButton>
        <ExploreContainer name="Tab 1 page" />
      </IonContent>
    </IonPage>
  );
};
