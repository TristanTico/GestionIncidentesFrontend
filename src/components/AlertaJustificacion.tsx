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
import { useSgi } from "../context/sgiContext";

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
  const [errors, setErrors] = useState({ct_justificacionDeCierre : ""});

  const validateJustificacion = (ct_justificacionDeCierre: string) => {
    let error = "";
    if (!ct_justificacionDeCierre) error = "El campo de Justificación no puede estar vacío.";
    else if (ct_justificacionDeCierre.length < 5) error = "El Justificación debe tener al menos 5 letras.";
    else if (ct_justificacionDeCierre.length > 30) error = "El Justificación no puede tener más de 150 letras.";
    else {
      const ct_justificacionDeCierreRegex = /^[A-Za-z0-9\s]+$/;
      if (!ct_justificacionDeCierreRegex.test(ct_justificacionDeCierre)) error = "El Justificación no puede contener caracteres especiales.";
    }
    setErrors((prevErrors) => ({ ...prevErrors, ct_justificacionDeCierre: error }));
    return error === "";
  };

  const handleSubmit = () => {
    const isJustificacionValid = validateJustificacion(ct_justificacionDeCierre);
    if(!isJustificacionValid) {
      return;
    }
    const justificacion = { ct_justificacionDeCierre };
    onSubmit(ct_cod_incidencia, justificacion);
    limpiarForm();
    onClose();
  };

  const limpiarForm = () => {
    setCt_justificacionDeCierre("");
    setErrors({ ct_justificacionDeCierre: ""});
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
                label="Justificación de cierre"
                labelPlacement="floating"
                placeholder="Digite la justificación de cierre"
                value={ct_justificacionDeCierre}
                onIonInput={(e) => setCt_justificacionDeCierre(e.detail.value!)}
                onIonBlur={() => validateJustificacion(ct_justificacionDeCierre)}
                rows={5}
              />
            </IonItem>
            {errors.ct_justificacionDeCierre && <p className="error-message">{errors.ct_justificacionDeCierre}</p>}
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
