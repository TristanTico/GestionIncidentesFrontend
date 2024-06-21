import React, { useState } from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonTextarea,
  IonTitle,
  IonToolbar,
  IonList,
  IonToast,
} from "@ionic/react";

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  ct_cod_incidencia: any | null;
  onSubmit: (ct_cod_incidencia: string, justificacion: any) => void;
}

const AlertaJustificacion: React.FC<FormModalProps> = ({
  isOpen,
  onClose,
  ct_cod_incidencia,
  onSubmit,
}) => {
  const [ct_justificacionDeCierre, setCt_justificacionDeCierre] = useState("");

  const handleSubmit = () => {
    const justificacion = { ct_justificacionDeCierre };
    onSubmit(ct_cod_incidencia, justificacion);
    limpiarForm();
    onClose();
  };

  const limpiarForm = () => {
    setCt_justificacionDeCierre("");
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Justificar Cierre</IonTitle>
          <IonButton slot="end" onClick={onClose} color="danger">
            Cerrar
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form>
          <IonList inset={true}>
            <IonItem>
              <IonTextarea
                label="Descripcion"
                labelPlacement="floating"
                placeholder="Digite la descripcion"
                value={ct_justificacionDeCierre}
                onIonInput={(e) => setCt_justificacionDeCierre(e.detail.value!)}
                rows={5}
              />
            </IonItem>
            <IonButton expand="block" onClick={handleSubmit}>
              Registrar
            </IonButton>
          </IonList>
        </form>
      </IonContent>
    </IonModal>
  );
};

export default AlertaJustificacion;
