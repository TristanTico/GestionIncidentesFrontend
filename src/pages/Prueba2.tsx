import React, { useEffect } from "react";
import {
  IonContent,
  IonPage,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonCardSubtitle,
} from "@ionic/react";
import "./Home.css";
import MenuIcon from "../components/MenuIcon";
import Floating from "../components/Floating";
import { useSgi } from "../context/sgiContext";
import { useAuth } from "../context/authContext";

const Prueba2: React.FC = () => {
  const {nombrePrueba} = useAuth();
  const { getIncidenciaXusuario, incidencias } = useSgi();

  useEffect(() => {
    getIncidenciaXusuario();
  }, []);

  return (
    <IonPage>
      <MenuIcon nombreUsuario={nombrePrueba}/>
      <IonContent className="ion-padding-top" color="light">
        <Floating />
        <div className="card-container">
          {incidencias && incidencias.length > 0 ? (
            incidencias.map((incidencia, index) => (
              <IonCard className="fab-margin" key={index}>
                <IonCardHeader>
                  <IonCardTitle> Titulo: {incidencia.ct_titulo}</IonCardTitle>
                  <IonCardSubtitle> Lugar: {incidencia.ct_lugar}</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent> Descripcion: {incidencia.ct_descripcion}</IonCardContent>
              </IonCard>
            ))
          ) : (
            <IonCard className="fab-margin">
              <IonCardHeader>
                <IonCardTitle>No hay incidencias</IonCardTitle>
              </IonCardHeader>
            </IonCard>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Prueba2;
