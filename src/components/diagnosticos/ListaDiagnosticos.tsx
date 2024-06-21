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
  IonButton,
} from "@ionic/react";
import { chevronForward } from "ionicons/icons";
import { useSgi } from "../../context/sgiContext";
import { useAuth } from "../../context/authContext";
//import IncidenciaModal, { InciModal } from "./incidencias/IncidenciaModal";

//import "./listado.css";
import "../listado.css";
import MenuIcon from "../MenuIcon";

const ListaDiagnosticos: React.FC = () => {
  const { getTokenPayload } = useAuth();
  //const [selectedIncidencia, setSelectedIncidencia] = useState<InciModal | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const datos = getTokenPayload();

  const { getDiagnosticos, tecnicoDiagnostico, actualizarEstadoTerminado } = useSgi();

  useEffect(() => {
    getDiagnosticos();
  }, []);

  const formatDate = (dateString: any) => {
    if (!dateString) return "Fecha no disponible";
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  };

  const actualizarTerminado = async (ct_cod_incidencia: any) => {
    try {
      const res = await actualizarEstadoTerminado(ct_cod_incidencia);
      console.log(res);
      getDiagnosticos();
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
      <MenuIcon nombreUsuario={datos.nombre} />
      <IonContent color="light">
        <div className="header-container">
          <IonTitle className="page-title">Listado de diagnosticos</IonTitle>
        </div>
        <div className="divider"></div>
        <IonList inset={true}>
          {tecnicoDiagnostico && tecnicoDiagnostico.length > 0 ? (
            tecnicoDiagnostico.map((incidencia, index) => (
              <IonItem button={true} detail={false} key={index}>
                <div className="unread-indicator-wrapper" slot="start">
                  <div className="unread-indicator"></div>
                </div>
                <IonLabel>
                  <strong>{incidencia.ct_descripcion}</strong>
                  <IonText>{incidencia.cn_tiempoSolucion}</IonText>
                  <br />
                  <IonText>{incidencia.ct_cod_incidencia}</IonText>
                  <br />
                  <IonNote color="medium" className="ion-text-wrap">
                    {incidencia.ct_observacion}
                  </IonNote>
                </IonLabel>
                <div className="metadata-end-wrapper" slot="end">
                  <IonNote color="medium">
                    {formatDate(incidencia.ct_fechaHora)}
                  </IonNote>
                  <IonIcon color="medium" icon={chevronForward}></IonIcon>
                </div>
                <div className="button-wrapper">
                  {incidencia.cn_cod_estado === 4 && (
                    <IonButton color="primary" onClick={() => actualizarTerminado(incidencia.ct_cod_incidencia)}>Terminar</IonButton>
                  )}
                </div>
              </IonItem>
            ))
          ) : (
            <div>No hay diagnosticos</div>
          )}
        </IonList>
      </IonContent>
    </>
  );
};
export default ListaDiagnosticos;
