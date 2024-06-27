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
  const [errors, setErrors] = useState({cn_tiempoSolucion: "", ct_descripcion: "", ct_observacion: "" });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const validateDescripcion = (ct_descripcion: string) => {
    let error = "";
    if (!ct_descripcion) error = "El campo de Descripcion no puede estar vacío.";
    else if (ct_descripcion.length < 5) error = "El Descripcion debe tener al menos 5 letras.";
    else if (ct_descripcion.length > 30) error = "El Descripcion no puede tener más de 150 letras.";
    else {
      const descripcionRegex = /^[A-Za-z0-9\s]+$/;
      if (!descripcionRegex.test(ct_descripcion)) error = "El Descripcion no puede contener caracteres especiales.";
    }
    setErrors((prevErrors) => ({ ...prevErrors, ct_descripcion: error }));
    return error === "";
  };

  const validateObservacion = (ct_observacion: string) => {
    let error = "";
    if (!ct_observacion) error = "El campo de Observacion no puede estar vacío.";
    else if (ct_observacion.length < 5) error = "El Observacion debe tener al menos 5 letras.";
    else if (ct_observacion.length > 30) error = "El Observacion no puede tener más de 150 letras.";
    else {
      const observacionRegex = /^[A-Za-z0-9\s]+$/;
      if (!observacionRegex.test(ct_observacion)) error = "El Observacion no puede contener caracteres especiales.";
    }
    setErrors((prevErrors) => ({ ...prevErrors, ct_observacion: error }));
    return error === "";
  };

  const handleSubmit = () => {
    const isValidDescripcion = validateDescripcion(ct_descripcion);
    const isValidObservacion = validateObservacion(ct_observacion);
    if(!isValidDescripcion || !isValidObservacion){
      return;
    }
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
    setErrors({cn_tiempoSolucion: "", ct_descripcion: "", ct_observacion: "" });
  };

  const handleClose = () => {
    limpiarForm();
    onClose();
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={handleClose}>
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
                onIonBlur={() => validateDescripcion(ct_descripcion)}
                rows={5}
              />
            </IonItem>
            {errors.ct_descripcion && <p className="error-message">{errors.ct_descripcion}</p>}

            <IonItem>
              <IonTextarea
                label="Observacion"
                labelPlacement="floating"
                placeholder="Digite la observacion"
                value={ct_observacion}
                onIonInput={(e) => setCt_observacion(e.detail.value!)}
                onIonBlur={() => validateObservacion(ct_observacion)}
                rows={5}
              />
            </IonItem>
            {errors.ct_observacion && <p className="error-message">{errors.ct_observacion}</p>}
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
