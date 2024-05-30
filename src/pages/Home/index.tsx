import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import { CardProgress, ProgressBar, Title, UserHeader } from "@components";
import { useSession } from "@providers";
import { CardButton } from "src/components/card-button";
import {
  listOutline,
  logoYoutube,
  readerOutline,
  receiptOutline,
} from "ionicons/icons";

export const Home: React.FC = () => {
  const router = useIonRouter();
  const { session } = useSession();
  return (
    <IonPage>
      <UserHeader session={session} />
      <IonContent fullscreen>
        <div className="d-flex column gap-4">
          <div className="d-flex justify-center gap-2">
            <CardButton
              icon={receiptOutline}
              onClick={() => router.push("/in/despesas")}
            >
              Despesas
            </CardButton>
            <CardButton
              icon={listOutline}
              onClick={() => router.push("/in/metas")}
            >
              Metas
            </CardButton>
            <CardButton
              icon={readerOutline}
              onClick={() => router.push("/in/metas")}
            >
              Dívidas
            </CardButton>
            <CardButton
              icon={logoYoutube}
              onClick={() => window.open("https://www.youtube.com/", "_blank")}
            >
              Aprenda
            </CardButton>
          </div>

          <div className="ion-margin">
            <div className="mb-4">
              <Title>Contas a pagar</Title>
            </div>
            <div className="mb-4">
              <ProgressBar progresses={[10, 20, 30, 40]} />
            </div>
            <div
              className="d-grid gap-2"
              style={{
                gridTemplateColumns: "1fr 1fr 1fr 1fr",
              }}
            >
              <CardProgress title="Condomínio" progress={10} />
              <CardProgress title="Aluguel" progress={20} />
              <CardProgress title="Alimentação" progress={20} />
              <CardProgress title="Energia" progress={6} />
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};
