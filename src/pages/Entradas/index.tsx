import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonSegment, IonSegmentButton, IonLabel, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon, IonGrid, IonRow, IonCol, IonButton } from '@ionic/react';
import { useIonRouter } from '@ionic/react';
import './styles.css';
import { Header } from "@components";

import {home, flash, pizza, water, calendarNumber, statsChart, car } from 'ionicons/icons';

export const Entradas = () => {
  const router = useIonRouter();
  const [selectedTab, setSelectedTab] = useState('aReceber');

  const handleSegmentChange = (e: CustomEvent) => {
    setSelectedTab(e.detail.value);
  };

  const handleCardClick = () => {
    router.push('/in/edtentrada');
  };

  useEffect(() => {
    // Coloque qualquer lógica que precise ser executada ao abrir a página aqui
  }, []);

  return (
    <IonPage>
      <Header title="Entradas" defaultHref="/in/home" backButton />
      <IonContent className="ion-padding entradas-container">
        <IonSegment value={selectedTab} onIonChange={handleSegmentChange}>
          <IonSegmentButton value="aReceber">
            <IonLabel>A receber</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="recebidas">
            <IonLabel>Recebidas</IonLabel>
          </IonSegmentButton>
        </IonSegment>

        {selectedTab === 'aReceber' && (
          <div>
            {/* Conteúdo da Tab "A receber" */}
            <IonCard button={true} onClick={handleCardClick}>
              <IonGrid>
                <IonRow>
                  <IonCol size="auto" className="logo">
                    <IonIcon icon={calendarNumber} size="large"></IonIcon>
                  </IonCol>
                  <IonCol>
                    <IonCardHeader>
                      <IonCardTitle>Salário</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>R$4.000,00</IonCardContent>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCard>

            <IonCard button={true} onClick={handleCardClick}>
              <IonGrid>
                <IonRow>
                  <IonCol size="auto" className="logo">
                    <IonIcon icon={statsChart} size="large"></IonIcon>
                  </IonCol>
                  <IonCol>
                    <IonCardHeader>
                      <IonCardTitle>Investimentos</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>R$750,00</IonCardContent>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCard>

            <IonCard button={true} onClick={handleCardClick}>
              <IonGrid>
                <IonRow>
                  <IonCol size="auto" className="logo">
                    <IonIcon icon={car} size="large"></IonIcon>
                  </IonCol>
                  <IonCol>
                    <IonCardHeader>
                      <IonCardTitle>Venda do Carro</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>R$90.000,00</IonCardContent>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCard>

            <IonButton expand="full" color="dark" href='/in/novaentrada'>Nova Entrada</IonButton>

          </div>
        )}
        {selectedTab === 'recebidas' && (
          <div>
            {/* Conteúdo da Tab "Recebidas" */}
            <IonCard button={true}>
              <IonGrid>
                <IonRow>
                  <IonCol size="auto" className="logo">
                    <IonIcon icon={home} size="large"></IonIcon>
                  </IonCol>
                  <IonCol>
                    <IonCardHeader>
                      <IonCardTitle>Venda de Imóvel</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>R$800.000,00</IonCardContent>
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
