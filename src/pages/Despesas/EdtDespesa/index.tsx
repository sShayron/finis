import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonSegment, IonSegmentButton, IonLabel, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon, IonGrid, IonRow, IonCol, IonButton } from '@ionic/react';
import { useIonRouter } from '@ionic/react';
import './styles.css';
import { Header } from "@components";

import { logoIonic, home, flash, pizza, water } from 'ionicons/icons';

export const EdtDespesa = () => {
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
            <IonLabel>Teste</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="pagas">
            <IonLabel>Teste</IonLabel>
          </IonSegmentButton>
        </IonSegment>

        {selectedTab === 'aPagar' && (
          <div>
            {/* Conteúdo da Tab "A pagar" */}
          </div>
        )}
        {selectedTab === 'pagas' && (
          <div>
            {/* Conteúdo da Tab "Pagas" */}
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};
