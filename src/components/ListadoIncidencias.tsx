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
  IonSearchbar,
  IonButton,
  IonToast,
} from "@ionic/react";
import { chevronForward, eye, image } from "ionicons/icons";
import { useSgi } from "../context/sgiContext";
import { useAuth } from "../context/authContext";
import IncidenciaModal, { InciModal } from "./incidencias/IncidenciaModal";
import ModalImagenesInci, {ImagesInciModal} from "./incidencias/ModalImagenesInci";

import "./listado.css";
import MenuIcon from "./MenuIcon";

const ListadoIncidencias: React.FC = () => {
  const { getTokenPayload } = useAuth();
  const [selectedIncidencia, setSelectedIncidencia] =
    useState<InciModal | null>(null);
  const [selectedIncidenciaImages, setSelectedIncidenciaImages] =
    useState<ImagesInciModal | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const datos = getTokenPayload();

  const { incidencias, getIncidenciaXusuario, getIncidencia, getImagenesIncidencia, getTablaImagenes } = useSgi();

  useEffect(() => {
    getIncidenciaXusuario();
    //getTablaImagenes();
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

  const getInciImages = async (ct_cod_incidencia: any) => {
    try {
      const res = await getImagenesIncidencia(ct_cod_incidencia);
      setSelectedIncidenciaImages({ct_cod_incidencia, ct_urlImagenes: res.data});
      setIsOpen(true);
    } catch (error : any) {
      setToastMessage(error.response.data.message);
      setShowToast(true);
      console.log(error);
    }
  }

  const formatDate = (dateString: any) => {
    if (!dateString) return "Fecha no disponible";
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  };

  // Ensure incidencias is not null
  const filteredIncidencias = (incidencias || []).filter((incidencia) => {
    return (
      incidencia.ct_titulo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incidencia.ct_lugar?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incidencia.ct_descripcion
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      incidencia.t_estados?.ct_descripcion
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  });

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
                <div className="button-wrapper">
                  <IonButton color="info" onClick={() => getInci(incidencia.ct_cod_incidencia)}>
                    <IonIcon icon={eye} slot="start" />
                    Detalles
                  </IonButton>
                  <IonButton color="secondary" onClick={() => getInciImages(incidencia.ct_cod_incidencia)}>
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
            <div>No hay incidencias</div>
          )}
        </IonList>
        {selectedIncidencia && (
          <IncidenciaModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            inciModal={selectedIncidencia}
          />
        )}
        {selectedIncidenciaImages && (
          <ModalImagenesInci
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            imagesInciModal={selectedIncidenciaImages}
          />
        )}
      </IonContent>
    </>
  );
};
export default ListadoIncidencias;
