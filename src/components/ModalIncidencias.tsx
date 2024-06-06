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
} from "@ionic/react";

import { useSgi } from "../context/sgiContext";

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalIncidencias: React.FC<FormModalProps> = ({ isOpen, onClose }) => {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [lugar, setLugar] = useState("");
  const { crearIncidencia, getIncidenciaXusuario } = useSgi();

  const handleSubmit = async () => {
    try {
      await crearIncidencia({
        ct_titulo: titulo,
        ct_descripcion: descripcion,
        ct_lugar: lugar,
      });
      getIncidenciaXusuario();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Agregar Incidencia</IonTitle>
          <IonButton slot="end" onClick={onClose} color="danger">
            Cerrar
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form>
          <IonItem>
            <IonLabel position="stacked">Título</IonLabel>
            <IonInput
              value={titulo}
              placeholder="Ingrese el título"
              onIonInput={(e) => setTitulo(e.detail.value!)}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Descripción</IonLabel>
            <IonTextarea
              value={descripcion}
              placeholder="Ingrese la descripción"
              onIonInput={(e) => setDescripcion(e.detail.value!)}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Lugar</IonLabel>
            <IonInput
              value={lugar}
              placeholder="Ingrese el lugar"
              onIonInput={(e) => setLugar(e.detail.value!)}
            />
          </IonItem>
          <IonButton expand="block" onClick={handleSubmit} color="primary">
            Registrar
          </IonButton>
        </form>
      </IonContent>
    </IonModal>
  );
};

export default ModalIncidencias;
