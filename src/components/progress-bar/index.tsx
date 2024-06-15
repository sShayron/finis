import React, { useMemo } from "react";
import "./styles.css";
import { StyledCircle } from "./styles";
import {
  IonButton,
  IonContent,
  IonIcon,
  IonPopover,
  IonText,
} from "@ionic/react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { informationCircleOutline } from "ionicons/icons";

const progressesClasses = ["first", "second", "third", "fourth"];

export const ProgressBar: React.FC<{
  id: string;
  tooltip: string;
  progresses: number[];
  tips: string[];
  moreThan100Text?: string;
  moreThan188Type?: string;
}> = ({ progresses, id, tooltip, tips, moreThan100Text, moreThan188Type }) => {
  const totals = useMemo(
    () => progresses.reduce((acc, actual) => acc + actual, 0),
    [progresses]
  );
  const progressLines = useMemo(() => {
    return progresses.reduce<{ progress: number; total: number }[]>(
      (accumulator, actual, idx) => [
        ...accumulator,
        {
          progress: actual,
          total: idx > 0 ? accumulator[idx - 1].total + actual : actual,
        },
      ],
      []
    );
  }, [progresses]);

  const moreThan100 = useMemo(() => totals > 100, [totals]);

  const month = format(new Date(), "MMMM", { locale: ptBR });

  return (
    <div className="progress-bar">
      <div className="totals">
        <div className="percent d-flex justify-center align-center column">
          <div className="month d-flex align-center justify-center column">
            <div
              className="d-flex gap-2 align-center"
              id={`click-trigger-${id}`}
              style={{ cursor: "pointer" }}
            >
              <IonText>
                <h4>{month}</h4>
              </IonText>
              <IonIcon icon={informationCircleOutline} />
              <IonPopover
                trigger={`click-trigger-${id}`}
                alignment="center"
                triggerAction="click"
              >
                <IonContent class="ion-padding">{tooltip}</IonContent>
              </IonPopover>
            </div>
            <IonText>
              <span>2024</span>
            </IonText>
          </div>
          <IonText
            id={moreThan100 ? `more-than-100-${id}` : `percent-${id}`}
            color={moreThan100 ? moreThan188Type : "dark"}
            style={{ cursor: moreThan100 ? "pointer" : "default" }}
          >
            <b style={{ fontSize: "2rem" }}>{totals}%</b>
          </IonText>
          {moreThan100 && (
            <IonPopover
              trigger={`more-than-100-${id}`}
              alignment="center"
              triggerAction="click"
            >
              <IonContent class="ion-padding">{moreThan100Text}</IonContent>
            </IonPopover>
          )}
          <IonPopover
            trigger={`click-trigger-${id}`}
            alignment="center"
            triggerAction="click"
          >
            <IonContent class="ion-padding">{tooltip}</IonContent>
          </IonPopover>
        </div>
      </div>
      <svg
        width="250"
        height="250"
        viewBox="0 0 250 250"
        className="circular-progress"
      >
        <circle className="bg" />
        {progressLines.map(({ progress }, idx, array) => (
          <StyledCircle
            className={progressesClasses[idx]}
            progress={progress}
            accumulator={idx > 0 ? array[idx - 1].total : 0}
          >
            <title>{tips[idx]}</title>
          </StyledCircle>
        ))}
      </svg>
    </div>
  );
};
