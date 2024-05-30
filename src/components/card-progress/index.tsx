import { IonProgressBar, IonText } from "@ionic/react";
import { CardProgressContainer } from "./styles";

export const CardProgress: React.FC<{ title: string; progress: number }> = ({
  title,
  progress,
}) => {
  return (
    <CardProgressContainer>
      <IonText>
        <span style={{ fontSize: "0.75rem" }}>{title}</span>
      </IonText>
      <IonText color="dark">
        <b style={{ fontSize: "1.5rem", color: "#000" }}>{progress}%</b>
      </IonText>
      <IonProgressBar color="dark" value={progress / 100} />
    </CardProgressContainer>
  );
};
