import { IonContent, IonPage } from "@ionic/react";
import { BottomTabs, ExploreContainer, UserHeader } from "@components";
import { useSession } from "@providers";
import { CardButton } from "src/components/card-button";
import { receiptOutline } from "ionicons/icons";

export const Home: React.FC = () => {
  const { session } = useSession();
  return (
    <IonPage>
      <UserHeader session={session} />
      <IonContent fullscreen>
        <CardButton icon={receiptOutline}>Despesas</CardButton>
        <ExploreContainer name="Tab 1 page" />
      </IonContent>
      <BottomTabs />
    </IonPage>
  );
};
