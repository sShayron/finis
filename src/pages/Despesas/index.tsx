import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonSegment, IonSegmentButton, IonLabel, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon, IonGrid, IonRow, IonCol, IonButton } from '@ionic/react';
import { useIonRouter } from '@ionic/react';
import './styles.css';
import { Header } from "@components";

import { logoIonic, home, flash, pizza, water } from 'ionicons/icons';

export const Despesas = () => {
  const router = useIonRouter();
  const [selectedTab, setSelectedTab] = useState('aPagar');

  const handleSegmentChange = (e: CustomEvent) => {
    setSelectedTab(e.detail.value);
  };

  useEffect(() => {
    // Coloque qualquer lógica que precise ser executada ao abrir a página aqui
  }, []);

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

        {selectedTab === 'aPagar' && (
          <div>
            {/* Conteúdo da Tab "A pagar" */}
            <IonCard button={true}>
              <IonGrid>
                <IonRow>
                  <IonCol size="auto" className="logo">
                    <IonIcon icon={home} size="large"></IonIcon>
                  </IonCol>
                  <IonCol>
                    <IonCardHeader>
                      <IonCardTitle>Financiamento Caixa</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>R$1.500,00</IonCardContent>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCard>

            <IonCard button={true}>
              <IonGrid>
                <IonRow>
                  <IonCol size="auto" className="logo">
                    <IonIcon icon={home} size="large"></IonIcon>
                  </IonCol>
                  <IonCol>
                    <IonCardHeader>
                      <IonCardTitle>Condominio</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>R$600,00</IonCardContent>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCard>

            <IonCard button={true}>
              <IonGrid>
                <IonRow>
                  <IonCol size="auto" className="logo">
                    <IonIcon icon={pizza} size="large"></IonIcon>
                  </IonCol>
                  <IonCol>
                    <IonCardHeader>
                      <IonCardTitle>Alimentação</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>R$900,00</IonCardContent>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCard>

            <IonCard button={true}>
              <IonGrid>
                <IonRow>
                  <IonCol size="auto" className="logo">
                    <IonIcon icon={flash} size="large"></IonIcon>
                  </IonCol>
                  <IonCol>
                    <IonCardHeader>
                      <IonCardTitle>Energia</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>R$250,00</IonCardContent>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCard>

            <IonButton expand="full" color="dark" href='/in/newdespesa'>Nova Despesa</IonButton>

          </div>
        )}
        {selectedTab === 'pagas' && (
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
