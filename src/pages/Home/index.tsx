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
import { useDespesas, useMetas } from "@hooks";

export const Home: React.FC = () => {
  const router = useIonRouter();
  const { session } = useSession();
  const { metas, totalMetas } = useMetas(4);
  const { despesas, totalIncomes } = useDespesas(4);

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
              <ProgressBar
                moreThan100Text="Atenção! Suas despesas estão comprometendo mais de 100% da sua renda."
                moreThan188Type="danger"
                id="despesas"
                tooltip="Quanto cada despesa estão comprometendo da sua renda no mês."
                progresses={
                  despesas.map((despesa) => {
                    const prog = (despesa.value / totalIncomes) * 100;
                    return +prog.toFixed(1);
                  }) as number[]
                }
                tips={despesas.map((despesa) => despesa.title) as string[]}
              />
            </div>
            <div
              className="d-grid gap-2"
              style={{
                gridTemplateColumns: "repeat(4, 1fr)",
              }}
            >
              {despesas.map((despesa) => {
                const prog = (despesa.value / totalIncomes) * 100;
                return (
                  <CardProgress
                    title={despesa.title}
                    progress={+prog.toFixed(1)}
                  />
                );
              })}
            </div>
          </div>

          <div className="ion-margin">
            <div className="mb-4">
              <Title>Metas</Title>
            </div>
            <div className="mb-4">
              <ProgressBar
                id="metas"
                tooltip="Quanto cada meta representa no valor total de metas estipulados."
                progresses={metas.map((meta) => {
                  const prog = (meta.value / totalMetas) * 100;
                  return +prog.toFixed(1);
                })}
                tips={metas.map((meta) => meta.title)}
              />
            </div>
            <div
              className="d-grid gap-2"
              style={{
                gridTemplateColumns: "repeat(4, 1fr)",
              }}
            >
              {metas.map((meta) => {
                const prog = (meta.value / totalMetas) * 100;
                return (
                  <CardProgress
                    title={meta.title}
                    progress={+prog.toFixed(1)}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};
