import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonSegment, IonSegmentButton, IonLabel, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon, IonGrid, IonRow, IonCol, IonButton } from '@ionic/react';
import { useIonRouter } from '@ionic/react';
import './styles.css';
import { Header } from "@components";

import { airplane, logoIonic, car, bicycle, home } from 'ionicons/icons';

export const Metas = () => {
  const router = useIonRouter();
  const [selectedTab, setSelectedTab] = useState('emAndamento');

  const handleSegmentChange = (e: CustomEvent) => {
    setSelectedTab(e.detail.value);
  };

  const handleCardClick = () => {
    router.push('/in/edtmeta');
  };

  useEffect(() => {
    // Coloque qualquer lógica que precise ser executada ao abrir a página aqui
  }, []);

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

        {selectedTab === 'emAndamento' && (
          <div>
            {/* Conteúdo da Tab "Em Andamento" */}
            <IonCard button={true} onClick={handleCardClick}>
              <IonGrid>
                <IonRow>
                  <IonCol size="auto" className="logo">
                    <IonIcon icon={airplane} size="large"></IonIcon>
                  </IonCol>
                  <IonCol>
                    <IonCardHeader>
                      <IonCardTitle>Viagem Internacional</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>Meta de R$15.000 para visitar a Disney</IonCardContent>
                  </IonCol>
                  <IonCol size="auto" className="logo">
                    <IonIcon icon={logoIonic} size="large"></IonIcon>
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
                      <IonCardTitle>Carro Novo</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>Meta de R$90.000 para Audi A3</IonCardContent>
                  </IonCol>
                  <IonCol size="auto" className="logo">
                    <IonIcon icon={logoIonic} size="large"></IonIcon>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCard>

            <IonCard button={true} onClick={handleCardClick}>
              <IonGrid>
                <IonRow>
                  <IonCol size="auto" className="logo">
                    <IonIcon icon={bicycle} size="large"></IonIcon>
                  </IonCol>
                  <IonCol>
                    <IonCardHeader>
                      <IonCardTitle>Bicicleta</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>Meta de R$7.000 para Hupi Naja</IonCardContent>
                  </IonCol>
                  <IonCol size="auto" className="logo">
                    <IonIcon icon={logoIonic} size="large"></IonIcon>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCard>

            <IonButton expand="full" color="dark" href='/in/novameta'>Nova Meta</IonButton>

          </div>
        )}
        {selectedTab === 'conquistadas' && (
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
                    <IonCardContent>Meta de R$300.000 para imóvel</IonCardContent>
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
