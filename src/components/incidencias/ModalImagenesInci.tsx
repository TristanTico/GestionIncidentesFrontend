import React from "react";
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonItem,
  IonLabel,
  IonImg
} from "@ionic/react";
import { useAuth } from "../../context/authContext";
import "./style.css";

export interface ImagesInciModal {
  ct_cod_incidencia: string;
  ct_urlImagenes: string[]; // An array of image URLs
}

interface IncidenciaModalProps {
  isOpen: boolean;
  onClose: () => void;
  imagesInciModal: ImagesInciModal | null;
}

const ModalImagenesInci: React.FC<IncidenciaModalProps> = ({
  isOpen,
  onClose,
  imagesInciModal,
}) => {
  if (!imagesInciModal) return null;

  const { getTokenPayload } = useAuth();
  const datos = getTokenPayload();

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Imágenes de la incidencia</IonTitle>
          <IonButton slot="end" onClick={onClose} color="danger">
            Cerrar
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent className="modal-content">
        {imagesInciModal.ct_urlImagenes.map((url, index) => {
          const nombreArchivo = url.substring(url.lastIndexOf('\\') + 1);
          return (
            <IonItem key={index} className="image-item">
              <IonImg src={`http://localhost:3000/images/${nombreArchivo}`} alt={`Imagen ${index + 1}`} />
            </IonItem>
          );
        })}
      </IonContent>
    </IonModal>
  );
};

export default ModalImagenesInci;
