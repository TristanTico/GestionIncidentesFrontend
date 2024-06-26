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
  IonToast,
  IonSearchbar,
} from "@ionic/react";
import { chevronForward, image } from "ionicons/icons";
import { useSgi } from "../context/sgiContext";
import { useAuth } from "../context/authContext";
import "./listado.css";
import MenuIcon from "./MenuIcon";
import AlertaJustificacion from "./AlertaJustificacion";
import IncidenciaModal from "./incidencias/IncidenciaModal";
import ModalImagenesInci, {
  ImagesInciModal,
} from "./incidencias/ModalImagenesInci";

const ListaSupervisor: React.FC = () => {
  const { getTokenPayload } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [ismodalOpen, setIsModalOpen] = useState(false);
  const [selectedIncidencia, setSelectedIncidencia] = useState<any>(null);
  const [selectedIncidenciaDeta, setSelectedIncidenciaDeta] =
    useState<any>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedIncidenciaImages, setSelectedIncidenciaImages] =
    useState<ImagesInciModal | null>(null);
  const [modalOpenImage, setModalOpenImage] = useState(false);

  const datos = getTokenPayload();

  const {
    getIncidenciasTerminadas,
    incidenciasTerminadas,
    actualizarEstadoAprobado,
    actualizarEstadoRechazado,
    actualizarEstadoCerrado,
    getIncidencia,
    getImagenesIncidencia,
  } = useSgi();

  useEffect(() => {
    getIncidenciasTerminadas();
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

  /*
  const actualizarTerminado = async (ct_cod_incidencia: any) => {
    try {
      const res = await actualizarEstadoTerminado(ct_cod_incidencia);
      console.log(res);
      getDiagnosticos();
    } catch (error) {
      console.log(error);
    }
  };
  */

  const actualizarAprobado = async (ct_cod_incidencia: any) => {
    try {
      const res = await actualizarEstadoAprobado(ct_cod_incidencia);
      console.log(res);
      getIncidenciasTerminadas();
    } catch (error) {
      console.log(error);
    }
  };

  const actualizarRechazado = async (ct_cod_incidencia: any) => {
    try {
      const res = await actualizarEstadoRechazado(ct_cod_incidencia);
      console.log(res);
      getIncidenciasTerminadas();
    } catch (error) {
      console.log(error);
    }
  };

  const abrirModalJustificacion = (ct_cod_incidencia: any) => {
    setSelectedIncidencia(ct_cod_incidencia);
    setModalOpen(true);
  };

  const cerrarModalJustificacion = () => {
    setModalOpen(false);
    setSelectedIncidencia(null);
  };

  const handleJustificacionSubmit = async (
    ct_cod_incidencia: string,
    justificacion: any
  ) => {
    try {
      await actualizarEstadoCerrado(ct_cod_incidencia, justificacion);
      setToastMessage("Incidencia cerrada exitosamente");
      setShowToast(true);
      getIncidenciasTerminadas();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredIncidencias = (incidenciasTerminadas || []).filter(
    (incidencia) => {
      return (
        incidencia.ct_titulo
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        incidencia.ct_lugar?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        incidencia.ct_descripcion
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        incidencia.t_estados?.ct_descripcion
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }
  );

  const getInci = async (ct_cod_incidencia: any) => {
    try {
      const res = await getIncidencia(ct_cod_incidencia);
      setSelectedIncidenciaDeta(res.data);
      setIsModalOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

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
                  {incidencia.cn_cod_estado === 6 && (
                    <IonButton
                      color="primary"
                      onClick={() =>
                        actualizarAprobado(incidencia.ct_cod_incidencia)
                      }
                    >
                      Aprobar
                    </IonButton>
                  )}
                  {incidencia.cn_cod_estado === 6 && (
                    <IonButton
                      color="danger"
                      onClick={() =>
                        actualizarRechazado(incidencia.ct_cod_incidencia)
                      }
                    >
                      Rechazar
                    </IonButton>
                  )}
                  {incidencia.cn_cod_estado === 6 && (
                    <IonButton
                      color="warning"
                      onClick={() =>
                        abrirModalJustificacion(incidencia.ct_cod_incidencia)
                      }
                    >
                      Cerrar
                    </IonButton>
                  )}
                  <IonButton
                    color="light"
                    onClick={() => getInci(incidencia.ct_cod_incidencia)}
                  >
                    Detalles
                  </IonButton>
                  <IonButton
                    color="secondary"
                    onClick={() => getInciImages(incidencia.ct_cod_incidencia)}
                  >
                    <IonIcon icon={image} slot="start" />
                    Imágenes
                  </IonButton>
                </div>
              </IonItem>
            ))
          ) : (
            <div>No hay Incidencias en estado terminado</div>
          )}
        </IonList>
        <AlertaJustificacion
          isOpen={modalOpen}
          onClose={cerrarModalJustificacion}
          ct_cod_incidencia={selectedIncidencia}
          onSubmit={handleJustificacionSubmit}
        />
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={7000}
        />
        {selectedIncidenciaDeta && (
          <IncidenciaModal
            isOpen={ismodalOpen}
            onClose={() => setIsModalOpen(false)}
            inciModal={selectedIncidenciaDeta}
          />
        )}
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
export default ListaSupervisor;
