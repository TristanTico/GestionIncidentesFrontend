import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonCardSubtitle,
  IonButtons,
  IonMenuButton,
} from "@ionic/react";

interface incidenciaIconProps {
  incidencias: any;
}

const incidenciasXusuarioCard: React.FC<incidenciaIconProps> = ({
  incidencias,
}) => {
  return (
    <IonCard className="fab-margin">
      <IonCardHeader>
        <IonCardTitle>{incidencias.titulo}</IonCardTitle>
        <IonCardSubtitle>{incidencias.lugar}</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        {incidencias.descripcion}
      </IonCardContent>
    </IonCard>
  );
};

export default incidenciasXusuarioCard;
