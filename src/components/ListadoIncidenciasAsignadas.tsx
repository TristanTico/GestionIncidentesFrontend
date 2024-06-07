import React, { useEffect, useState } from "react";
import {
  IonButton,
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

const ListadoIncidenciasAsignadas: React.FC = () => {
  const { getTokenPayload } = useAuth();
  const datos = getTokenPayload();

  const {
    incidencias,
    getIncidenciasAsignadas,
    actualizarEstadoRevision,
    actualizarEstadoReparacion,
  } = useSgi();

  useEffect(() => {
    getIncidenciasAsignadas();
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

  const actualizarRevision = async (ct_cod_incidencia: any) => {
    try {
      const res = await actualizarEstadoRevision(ct_cod_incidencia);
      console.log(res);
      getIncidenciasAsignadas();
    } catch (error) {
      console.log(error);
    }
  };

  const actualizarReparacion = async (ct_cod_incidencia: any) => {
    try {
      const res = await actualizarEstadoReparacion(ct_cod_incidencia);
      console.log(res);
      getIncidenciasAsignadas();
    } catch (error) {
      console.log(error);
    }
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
              <IonItem button={true} detail={false} key={index}>
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
                <div className="button-wrapper">
                  {incidencia.cn_cod_estado === 2 && (
                    <IonButton
                      color="primary"
                      onClick={() =>
                        actualizarRevision(incidencia.ct_cod_incidencia)
                      }
                    >
                      Revisión
                    </IonButton>
                  )}
                  {incidencia.cn_cod_estado === 3 && (
                    <IonButton
                      color="secondary"
                      onClick={() =>
                        actualizarReparacion(incidencia.ct_cod_incidencia)
                      }
                    >
                      Reparación
                    </IonButton>
                  )}
                  {incidencia.cn_cod_estado === 4 && (
                    <IonButton color="warning">Diagnosticar</IonButton>
                  )}
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
};

export default ListadoIncidenciasAsignadas;
