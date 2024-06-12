import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
} from "@ionic/react";
import { useIonRouter } from "@ionic/react";
import "./styles.css";
import { Button, Header } from "@components";

import { logoIonic, home, calendarNumber } from "ionicons/icons";
import { client } from "@client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useLocation } from "react-router";

export const Metas = () => {
  const router = useIonRouter();
  const [selectedTab, setSelectedTab] = useState("emAndamento");
  const [metas, setMetas] = useState([] as any[]);
  const location = useLocation();

  const getMetas = async () => {
    const res = await client?.get("/goal");
    setMetas(res?.data);
  };

  const handleSegmentChange = (e: CustomEvent) => {
    setSelectedTab(e.detail.value);
  };

  const handleCardClick = () => {
    router.push("/in/edtmeta");
  };

  useEffect(() => {
    getMetas();
  }, [location]);

  return (
    <IonPage>
      <Header title="Metas" defaultHref="/in/home" backButton />
      <IonContent className="ion-padding metas-container">
        <IonSegment value={selectedTab} onIonChange={handleSegmentChange}>
          <IonSegmentButton value="emAndamento">
            <IonLabel>Em Andamento</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="conquistadas">
            <IonLabel>Conquistadas</IonLabel>
          </IonSegmentButton>
        </IonSegment>

        {selectedTab === "emAndamento" && (
          <div>
            {/* Conteúdo da Tab "Em Andamento" */}

            {metas.map((meta) => (
              <IonCard key={meta.id} button={true} onClick={handleCardClick}>
                <IonGrid>
                  <IonRow>
                    <IonCol size="auto" className="logo">
                      <IonIcon icon={calendarNumber} size="large"></IonIcon>
                    </IonCol>
                    <IonCol>
                      <IonCardHeader>
                        <IonCardTitle>{meta.title}</IonCardTitle>
                      </IonCardHeader>
                      <IonCardContent>
                        {meta.description}{" "}
                        {format(meta.dateLimit, "dd/MM/yyyy", { locale: ptBR })}
                      </IonCardContent>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonCard>
            ))}

            <Button
              type="button"
              onClick={() => {
                router.push("/in/novameta");
              }}
            >
              Nova Meta
            </Button>
          </div>
        )}
        {selectedTab === "conquistadas" && (
          <div>
            {/* Conteúdo da Tab "Conquistadas" */}
            <IonCard button={true}>
              <IonGrid>
                <IonRow>
                  <IonCol size="auto" className="logo">
                    <IonIcon icon={home} size="large"></IonIcon>
                  </IonCol>
                  <IonCol>
                    <IonCardHeader>
                      <IonCardTitle>Casa Própia</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      Meta de R$300.000 para imóvel
                    </IonCardContent>
                  </IonCol>
                  <IonCol size="auto" className="logo">
                    <IonIcon icon={logoIonic} size="large"></IonIcon>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCard>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};
