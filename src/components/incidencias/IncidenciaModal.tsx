import React from "react";
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonInput,
} from "@ionic/react";
import { useAuth } from "../../context/authContext";
import "./style.css";

export interface InciModal {
  cod_incidencia: string;
  cd_fecha: string;
  titulo: string;
  lugar: string;
  justificacion: string | null;
  costos: number | null;
  duracion: number | null;
  prioridad: string | null;
  riesgo: string | null;
  afectacion: string | null;
  catagoria: string | null;
  estado: string;
}

interface IncidenciaModalProps {
  isOpen: boolean;
  onClose: () => void;
  inciModal: InciModal | null;
}

const IncidenciaModal: React.FC<IncidenciaModalProps> = ({
  isOpen,
  onClose,
  inciModal,
}) => {
  if (!inciModal) return null;

  const { getTokenPayload } = useAuth();
  const datos = getTokenPayload();
  const usuario = datos.roles.includes("Usuario");

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Detalle de Incidencia</IonTitle>
          <IonButton slot="end" onClick={onClose} color="danger">
            Cerrar
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent className="modal-content">
        <IonItem>
          <IonLabel position="stacked">Título:</IonLabel>
          <IonInput value={inciModal.titulo} readonly />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Lugar:</IonLabel>
          <IonInput value={inciModal.lugar} readonly />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Fecha:</IonLabel>
          <IonInput
            value={new Date(inciModal.cd_fecha).toLocaleString()}
            readonly
          />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Estado:</IonLabel>
          <IonInput value={inciModal.estado} readonly />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Justificación:</IonLabel>
          <IonInput value={inciModal.justificacion || "No asignado"} readonly />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Costos:</IonLabel>
          <IonInput
            value={inciModal.costos?.toString() || "No asignado"}
            readonly
          />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Duración:</IonLabel>
          <IonInput
            value={inciModal.duracion?.toString() || "No asignado"}
            readonly
          />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Prioridad:</IonLabel>
          <IonInput value={inciModal.prioridad || "No asignado"} readonly />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Riesgo:</IonLabel>
          <IonInput value={inciModal.riesgo || "No asignado"} readonly />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Afectación:</IonLabel>
          <IonInput value={inciModal.afectacion || "No asignado"} readonly />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Categoría:</IonLabel>
          <IonInput value={inciModal.catagoria || "No asignado"} readonly />
        </IonItem>
        {usuario && (
          <IonButton expand="block" color="primary">
            Re Asignar
          </IonButton>
        )}
      </IonContent>
    </IonModal>
  );
};

export default IncidenciaModal;
