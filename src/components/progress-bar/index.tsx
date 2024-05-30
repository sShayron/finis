import React, { useMemo } from "react";
import "./styles.css";
import { StyledCircle } from "./styles";
import { IonText } from "@ionic/react";

const progressesClasses = ["first", "second", "third", "fourth"];

export const ProgressBar: React.FC<{
  progresses: [number, number, number, number];
}> = ({ progresses }) => {
  const totals = useMemo(
    () => progresses.reduce((acc, actual) => acc + actual, 0),
    []
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
  }, []);

  return (
    <div className="progress-bar">
      <div className="totals">
        <div className="percent d-flex justify-center align-center column">
          <div className="month">
            <IonText>
              <h4>Maio</h4>
            </IonText>
            <IonText>
              <span>2024</span>
            </IonText>
          </div>
          <IonText color="dark">
            <b style={{ fontSize: "2rem" }}>{totals}%</b>
          </IonText>
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
          />
        ))}
      </svg>
    </div>
  );
};
