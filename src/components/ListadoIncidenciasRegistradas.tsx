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
import ModalAsignacion from "./ModalAsignacion";

const ListadoIncidenciasRegistradas: React.FC = () => {
  const { getTokenPayload } = useAuth();
  const datos = getTokenPayload();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIncidencia, setSelectedIncidencia] = useState<any>(null);

  const { incidencias, getIncidenciasRegistradas, getIncidencia } = useSgi();

  useEffect(() => {
    getIncidenciasRegistradas();
  }, []);

  /*
  const getInci = async (ct_cod_incidencia: any) => {
    try {
      const res = await getIncidencia(ct_cod_incidencia);
      setSelectedIncidencia(res.data);
      setIsModalOpen(true);
    } catch (error) {
      console.log(error);
    }
  };
  */

  const abrirModalAsignacion = (ct_cod_incidencia: any) => {
    setSelectedIncidencia(ct_cod_incidencia);
    setIsModalOpen(true);
  };

  const cerrarModalDiagnostico = () => {
    setIsModalOpen(false);
    setSelectedIncidencia(null);
  };

  const formatDate = (dateString: any) => {
    if (!dateString) return "Fecha no disponible";
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString("es-ES", options);
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
                onClick={() => abrirModalAsignacion(incidencia.ct_cod_incidencia)}
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
        <ModalAsignacion
          isOpen={isModalOpen}
          onClose={cerrarModalDiagnostico}
          ct_cod_incidencia={selectedIncidencia}
        />
      </IonContent>
    </>
  );
};
export default ListadoIncidenciasRegistradas;
