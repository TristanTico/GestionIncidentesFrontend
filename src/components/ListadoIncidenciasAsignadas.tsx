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
  IonSearchbar
} from "@ionic/react";
import { eye, image } from "ionicons/icons";
import { chevronForward } from "ionicons/icons";
import { useSgi } from "../context/sgiContext";
import { useAuth } from "../context/authContext";
import ModalDiagnostico from "./diagnosticos/ModalDiagnostico";
import ModalImagenesInci, { ImagesInciModal } from "./incidencias/ModalImagenesInci";

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
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedIncidenciaImages, setSelectedIncidenciaImages] =
    useState<ImagesInciModal | null>(null);
  const [modalOpenImage, setModalOpenImage] = useState(false);

  const {
    incidencias,
    incidenciasAsignadas,
    getIncidenciasAsignadas,
    actualizarEstadoRevision,
    actualizarEstadoReparacion,
    crearDiagnostico,
    getIncidencia,
    getImagenesIncidencia
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

  const formatDate = (dateString: any) => {
    if (!dateString) return "Fecha no disponible";
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  };

  const actualizarRevision = async (ct_cod_incidencia: any) => {
    try {
      const res = await actualizarEstadoRevision(ct_cod_incidencia);
      if (res.status === 200) {
        getIncidenciasAsignadas();
        setToastMessage("Incidencia actualizada a estado Revision");
        setShowToast(true);
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const actualizarReparacion = async (ct_cod_incidencia: any) => {
    try {
      const res = await actualizarEstadoReparacion(ct_cod_incidencia);
      if (res.status === 200) {
        console.log(res);
        getIncidenciasAsignadas();
        setToastMessage("Incidencia actualizada a estado Reparacion");
        setShowToast(true);
      }
    } catch (error: any) {
      setToastMessage(error.response.data.message);
      setShowToast(true);
      console.log(error.response.data.message);
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
    diagnostico: any,
    imagenes: File[]
  ) => {
    try {
      await crearDiagnostico(ct_cod_incidencia, diagnostico, imagenes);
    } catch (error) {
      console.log(error);
    }
  };
  const filteredIncidencias = (incidenciasAsignadas || []).filter((incidencia) => {
    return (
      incidencia.ct_titulo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incidencia.ct_lugar?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incidencia.ct_descripcion
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
        incidencia.t_estados?.ct_descripcion.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  const getInciImages = async (ct_cod_incidencia: any) => {
    try {
      const res = await getImagenesIncidencia(ct_cod_incidencia);
      setSelectedIncidenciaImages({
        ct_cod_incidencia,
        ct_urlImagenes: res.data,
      });
      setModalOpenImage(true);
    } catch (error: any) {
      setToastMessage(error.response.data.message);
      setShowToast(true);
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
        <IonSearchbar
          color="light"
          placeholder="Filtrar Incidencia"
          value={searchTerm}
          onIonInput={(e: any) => setSearchTerm(e.target.value)}
        ></IonSearchbar>
        <IonList inset={true}>
          {filteredIncidencias && filteredIncidencias.length > 0 ? (
            filteredIncidencias.map((incidencia, index) => (
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
                  <IonButton
                    color="secondary"
                    onClick={() => getInciImages(incidencia.ct_cod_incidencia)}
                  >
                    <IonIcon icon={image} slot="start" />
                    Imágenes
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
        {selectedIncidenciaImages && (
          <ModalImagenesInci
            isOpen={modalOpenImage}
            onClose={() => setModalOpenImage(false)}
            imagesInciModal={selectedIncidenciaImages}
          />
        )}
      </IonContent>
    </>
  );
};

export default ListadoIncidenciasAsignadas;
