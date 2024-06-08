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
  IonToast,
} from "@ionic/react";
import { eye } from "ionicons/icons";
import { chevronForward } from "ionicons/icons";
import { useSgi } from "../context/sgiContext";
import { useAuth } from "../context/authContext";
import ModalDiagnostico from "./diagnosticos/ModalDiagnostico";

import "./listado.css";
import MenuIcon from "./MenuIcon";
import IncidenciaModal from "./incidencias/IncidenciaModal";

const ListadoIncidenciasAsignadas: React.FC = () => {
  const { getTokenPayload } = useAuth();
  const datos = getTokenPayload();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIncidencia, setSelectedIncidencia] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const {
    incidencias,
    getIncidenciasAsignadas,
    actualizarEstadoRevision,
    actualizarEstadoReparacion,
    crearDiagnostico,
    getIncidencia,
  } = useSgi();

  useEffect(() => {
    try {
      getIncidenciasAsignadas();
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("No tienes incidencias asignadas");
    }
  }, []);

  const getInci = async (ct_cod_incidencia: any) => {
    try {
      const res = await getIncidencia(ct_cod_incidencia);
      setSelectedIncidencia(res.data);
      setModalOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  /*
  useEffect(() => {
    const getIncidenciasAsignadas = async () => {
      try {
        getIncidenciasAsignadas();
        setErrorMessage("");
      } catch (error) {
        setErrorMessage("No tienes incidencias");
      }
    };
    getIncidenciasAsignadas();
  }, [getIncidenciasAsignadas]);
  */

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
      setToastMessage("Incidencia actualizada a estado Revision");
      setShowToast(true);
    } catch (error) {
      console.log(error);
    }
  };

  const actualizarReparacion = async (ct_cod_incidencia: any) => {
    try {
      const res = await actualizarEstadoReparacion(ct_cod_incidencia);
      console.log(res);
      getIncidenciasAsignadas();
      setToastMessage("Incidencia actualizada a estado Reparacion");
      setShowToast(true);
    } catch (error) {
      console.log(error);
    }
  };

  const abrirModalDiagnostico = (ct_cod_incidencia: any) => {
    setSelectedIncidencia(ct_cod_incidencia);
    setIsModalOpen(true);
  };

  const cerrarModalDiagnostico = () => {
    setIsModalOpen(false);
    setSelectedIncidencia(null);
  };

  const handleDiagnosticoSubmit = async (
    ct_cod_incidencia: string,
    diagnostico: any
  ) => {
    try {
      await crearDiagnostico(ct_cod_incidencia, diagnostico);
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
                    <IonButton
                      color="warning"
                      onClick={() =>
                        abrirModalDiagnostico(incidencia.ct_cod_incidencia)
                      }
                    >
                      Diagnosticar
                    </IonButton>
                  )}
                  <IonButton
                    color="info"
                    onClick={() => getInci(incidencia.ct_cod_incidencia)}
                  >
                    <IonIcon icon={eye} slot="start" />
                    Ver
                  </IonButton>
                </div>
                <IonToast
                  isOpen={showToast}
                  onDidDismiss={() => setShowToast(false)}
                  message={toastMessage}
                  duration={1000}
                />
              </IonItem>
            ))
          ) : (
            <div className="noIncidencias">
              {" "}
              {errorMessage || "No tienes incidencias asignadas"}
            </div>
          )}
        </IonList>
        <ModalDiagnostico
          isOpen={isModalOpen}
          onClose={cerrarModalDiagnostico}
          ct_cod_incidencia={selectedIncidencia}
          onSubmit={handleDiagnosticoSubmit}
        />
        <IncidenciaModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          inciModal={selectedIncidencia}
        />
      </IonContent>
    </>
  );
};

export default ListadoIncidenciasAsignadas;
