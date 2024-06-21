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
  IonToast
} from "@ionic/react";

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  ct_cod_incidencia: any | null;
  onSubmit: (ct_cod_incidencia: string, diagnostico: any) => void;
}

const ModalDiagnostico: React.FC<FormModalProps> = ({
  isOpen,
  onClose,
  ct_cod_incidencia,
  onSubmit,
}) => {
  const [cn_tiempoSolucion, setCn_tiempoSolucion] = useState("");
  const [ct_descripcion, setCt_descripcion] = useState("");
  const [ct_observacion, setCt_observacion] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleSubmit = () => {
    const diagnostico = { ct_descripcion, cn_tiempoSolucion, ct_observacion };
    onSubmit(ct_cod_incidencia, diagnostico);
    setToastMessage("Diagnostico creado exitosamente");
    setShowToast(true);
    limpiarForm();
  };

  const limpiarForm = () => {
    setCn_tiempoSolucion("");
    setCt_descripcion("");
    setCt_observacion("");
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Agregar Diagnostico</IonTitle>
          <IonButton slot="end" onClick={onClose} color="danger">
            Cerrar
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form>
          <IonList inset={true}>
            <IonItem>
              <IonInput
                label="Tiempo de Solución"
                labelPlacement="floating"
                placeholder="Digite el tiempo de solucion"
                value={cn_tiempoSolucion}
                onIonInput={(e) => setCn_tiempoSolucion(e.detail.value!)}
                clearInput
              />
            </IonItem>
            <IonItem>
              <IonTextarea
                label="Descripcion"
                labelPlacement="floating"
                placeholder="Digite la descripcion"
                value={ct_descripcion}
                onIonInput={(e) => setCt_descripcion(e.detail.value!)}
                rows={5}
              />
            </IonItem>

            <IonItem>
              <IonTextarea
                label="Observacion"
                labelPlacement="floating"
                placeholder="Digite la observacion"
                value={ct_observacion}
                onIonInput={(e) => setCt_observacion(e.detail.value!)}
                rows={5}
              />
            </IonItem>
            <IonButton expand="block" onClick={handleSubmit}>
              Registrar
            </IonButton>
          </IonList>
          <IonToast
            isOpen={showToast}
            onDidDismiss={() => setShowToast(false)}
            message={toastMessage}
            duration={7000}
          />
        </form>
      </IonContent>
    </IonModal>
  );
};

export default ModalDiagnostico;
