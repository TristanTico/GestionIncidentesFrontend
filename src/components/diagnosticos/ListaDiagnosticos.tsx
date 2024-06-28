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
} from "@ionic/react";
import { chevronForward, image } from "ionicons/icons";
import { useSgi } from "../../context/sgiContext";
import { useAuth } from "../../context/authContext";
import ModalImagenesDiag, { ImagesdiagModal } from "./ModalImagenesDiag";

//import "./listado.css";
import "../listado.css";
import MenuIcon from "../MenuIcon";

const ListaDiagnosticos: React.FC = () => {
  const { getTokenPayload } = useAuth();
  const [selectedIncidenciaImages, setSelectedIncidenciaImages] =
    useState<ImagesdiagModal | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const datos = getTokenPayload();

  const {
    getDiagnosticos,
    tecnicoDiagnostico,
    actualizarEstadoTerminado,
    getImagenXDiagnostico,
  } = useSgi();

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

  const getImagenDiag = async (cn_cod_diagnostico: any) => {
    try {
      const res = await getImagenXDiagnostico(cn_cod_diagnostico);
      console.log("El cod", typeof cn_cod_diagnostico);

      console.log("Data desde el listado", res.data);
      setSelectedIncidenciaImages({
        cn_cod_diagnostico,
        ct_urlImagenes: res.data,
      });
      setModalOpen(true);
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
                    <IonButton
                      color="primary"
                      onClick={() =>
                        actualizarTerminado(incidencia.ct_cod_incidencia)
                      }
                    >
                      Terminar
                    </IonButton>
                  )}
                  <IonButton
                    color="secondary"
                    onClick={() => getImagenDiag(incidencia.cn_cod_diagnostico)}
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
                  color="danger"
                />
              </IonItem>
            ))
          ) : (
            <div>No hay diagnosticos</div>
          )}
        </IonList>
        {selectedIncidenciaImages && (
          <ModalImagenesDiag
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            imagesdiagModal={selectedIncidenciaImages}
          />
        )}
      </IonContent>
    </>
  );
};
export default ListaDiagnosticos;
