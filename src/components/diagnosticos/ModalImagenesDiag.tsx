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
import "../incidencias/style.css"

export interface ImagesdiagModal {
  cn_cod_diagnostico: number;
  ct_urlImagenes: string[]; // An array of image URLs
}

interface IncidenciaModalProps {
  isOpen: boolean;
  onClose: () => void;
  imagesdiagModal: ImagesdiagModal | null;
}

const ModalImagenesDiag: React.FC<IncidenciaModalProps> = ({
  isOpen,
  onClose,
  imagesdiagModal,
}) => {
  if (!imagesdiagModal) return null;

  const { getTokenPayload } = useAuth();
  const datos = getTokenPayload();

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Imágenes del diagnostico</IonTitle>
          <IonButton slot="end" onClick={onClose} color="danger">
            Cerrar
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent className="modal-content">
        {imagesdiagModal.ct_urlImagenes.map((url, index) => {
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

export default ModalImagenesDiag;
