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
import { Header } from "@components";

import {
  home,
  flash,
  pizza,
  water,
  car,
  gitNetwork,
  receipt,
} from "ionicons/icons";
import { useClient } from "@providers";
import { useLocation } from "react-router";

const mapCategoryIcon = {
  agua: water,
  alimentacao: pizza,
  moradia: home,
  energia: flash,
  veiculos: car,
  internet: gitNetwork,
  outros: receipt,
};

export const Despesas = () => {
  const router = useIonRouter();
  const [selectedTab, setSelectedTab] = useState("aPagar");
  const { client } = useClient();
  const [despesas, setDespesas] = useState([] as any[]);

  const location = useLocation();

  const handleSegmentChange = (e: CustomEvent) => {
    setSelectedTab(e.detail.value);
  };

  const handleCardClick = () => {
    router.push("/in/edtdespesa");
  };

  const getDespesas = async () => {
    const res = await client?.get("/income-expense");
    setDespesas(
      res?.data.incomeExpense.filter((d: any) => d.type === "expense")
    );
  };

  useEffect(() => {
    getDespesas();
  }, [location]);

  return (
    <IonPage>
      <Header title="Despesas" defaultHref="/in/home" backButton />
      <IonContent className="ion-padding despesas-container">
        <IonSegment value={selectedTab} onIonChange={handleSegmentChange}>
          <IonSegmentButton value="aPagar">
            <IonLabel>A pagar</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="pagas">
            <IonLabel>Pagas</IonLabel>
          </IonSegmentButton>
        </IonSegment>

        {selectedTab === "aPagar" && (
          <div>
            {despesas.map(({ title, description, value, category }) => (
              <IonCard key={title} button={true} onClick={handleCardClick}>
                <IonGrid>
                  <IonRow>
                    <IonCol size="auto" className="logo">
                      <IonIcon
                        icon={
                          mapCategoryIcon[
                            category as keyof typeof mapCategoryIcon
                          ]
                        }
                        size="large"
                      ></IonIcon>
                    </IonCol>
                    <IonCol>
                      <IonCardHeader>
                        <IonCardTitle>{title}</IonCardTitle>
                      </IonCardHeader>
                      <IonCardContent>
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(value)}
                      </IonCardContent>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonCard>
            ))}

            <IonButton
              expand="full"
              color="dark"
              onClick={() => router.push("/in/novadespesa")}
            >
              Nova Despesa
            </IonButton>
          </div>
        )}
        {selectedTab === "pagas" && (
          <div>
            {/* Conteúdo da Tab "Pagas" */}
            <IonCard button={true}>
              <IonGrid>
                <IonRow>
                  <IonCol size="auto" className="logo">
                    <IonIcon icon={water} size="large"></IonIcon>
                  </IonCol>
                  <IonCol>
                    <IonCardHeader>
                      <IonCardTitle>Água</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>R$80,00</IonCardContent>
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
