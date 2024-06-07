import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonText,
  IonTitle,
} from "@ionic/react";
import { chevronForward } from "ionicons/icons";
import { useSgi } from "../context/sgiContext";
import { useAuth } from "../context/authContext";

import "./listado.css";
import MenuIcon from "./MenuIcon";

const ListadoIncidenciasRegistradas: React.FC = () => {
  const {  getTokenPayload } = useAuth();
  const datos = getTokenPayload();

  const { incidencias, getIncidenciasRegistradas } = useSgi();

  useEffect(() => {
    getIncidenciasRegistradas();
  }, []);


  const formatDate = (dateString: any) => {
    if (!dateString) return "Fecha no disponible";
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <MenuIcon nombreUsuario={datos.nombre} />
      <IonContent color="light">
        <div className="header-container">
          <IonTitle className="page-title">Listado de Incidencias</IonTitle>
        </div>
        <div className="divider"></div>
        <IonList inset={true}>
          {incidencias && incidencias.length > 0 ? (
            incidencias.map((incidencia, index) => (
              <IonItem
                button={true}
                detail={false}
                key={index}
              >
                <div className="unread-indicator-wrapper" slot="start">
                  <div className="unread-indicator"></div>
                </div>
                <IonLabel>
                  <strong>{incidencia.ct_titulo}</strong>
                  <IonText>{incidencia.ct_lugar}</IonText>
                  <br />
                  <IonNote color="medium" className="ion-text-wrap">
                    {incidencia.ct_descripcion}
                  </IonNote>
                </IonLabel>
                <div className="metadata-end-wrapper" slot="end">
                  <IonNote color="medium">
                    {formatDate(incidencia.cd_fechaHora)}
                  </IonNote>
                  <IonIcon color="medium" icon={chevronForward}></IonIcon>
                </div>
              </IonItem>
            ))
          ) : (
            <div>No hay incidencias</div>
          )}
        </IonList>
      </IonContent>
    </>
  );
}
export default ListadoIncidenciasRegistradas;
