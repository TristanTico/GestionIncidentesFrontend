import { useState } from "react";
import {
  IonPage,
  IonContent,
  IonList,
  IonItem,
  IonInput,
  IonButton,
  IonTextarea,
  IonToast,
  IonTitle,
} from "@ionic/react";

import { useAuth } from "../../context/authContext";
import { useSgi } from "../../context/sgiContext";
import MenuIcon from "../MenuIcon";
import "./style.css";

const CrearIncidencia: React.FC = () => {
  const { nombrePrueba } = useAuth();
  const { crearIncidencia } = useSgi();
  const [titulo, setTitulo] = useState("");
  const [lugar, setLugar] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = async () => {
    try {
      const res = await crearIncidencia({
        ct_titulo: titulo,
        ct_descripcion: descripcion,
        ct_lugar: lugar,
      });
      if (res.status === 201) {
        setToastMessage(res.data.message);
        setShowToast(true);
        limpiarForm();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const limpiarForm = () => {
    setTitulo("");
    setLugar("");
    setDescripcion("");
  };

  return (
    <IonPage>
      <MenuIcon nombreUsuario={nombrePrueba} />
      <IonContent color="light">
        <div className="header-container">
          <IonTitle className="page-title">Crear Incidencia</IonTitle>
        </div>
        <div className="divider"></div>
        <form>
          <IonList inset={true}>
            <IonItem>
              <IonInput
                label="Título"
                labelPlacement="floating"
                placeholder="Digite el título"
                value={titulo}
                onIonInput={(e) => setTitulo(e.detail.value!)}
                clearInput
              />
            </IonItem>
            <IonItem>
              <IonInput
                label="Lugar"
                labelPlacement="floating"
                placeholder="Digite el lugar"
                value={lugar}
                onIonInput={(e) => setLugar(e.detail.value!)}
                clearInput
              />
            </IonItem>
            <IonItem>
              <IonTextarea
                label="Descripción"
                labelPlacement="floating"
                placeholder="Digite la descripcion"
                value={descripcion}
                onIonInput={(e) => setDescripcion(e.detail.value!)}
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
            duration={4000}
          />
        </form>
      </IonContent>
    </IonPage>
  );
};

export default CrearIncidencia;
