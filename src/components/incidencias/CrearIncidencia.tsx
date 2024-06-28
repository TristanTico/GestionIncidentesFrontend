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
  IonLabel,
  IonIcon
} from "@ionic/react";
import { cameraOutline } from "ionicons/icons";
import { useAuth } from "../../context/authContext";
import { useSgi } from "../../context/sgiContext";
import MenuIcon from "../MenuIcon";
import "./style.css";

const CrearIncidencia: React.FC = () => {
  const { getTokenPayload } = useAuth();
  const { crearIncidencia } = useSgi();
  const [titulo, setTitulo] = useState("");
  const [lugar, setLugar] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [errors, setErrors] = useState({ titulo: "", lugar: "", descripcion: "" });
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [imagenes, setImagenes] = useState<File[]>([]);
  const datos = getTokenPayload();

  const validateTitulo = (titulo: string) => {
    let error = "";
    if (!titulo) error = "El campo de título no puede estar vacío.";
    else if (titulo.length < 5) error = "El título debe tener al menos 5 letras.";
    else if (titulo.length > 30) error = "El título no puede tener más de 30 letras.";
    else {
      const tituloRegex = /^[A-Za-z0-9\s]+$/;
      if (!tituloRegex.test(titulo)) error = "El título no puede contener caracteres especiales.";
    }
    setErrors((prevErrors) => ({ ...prevErrors, titulo: error }));
    return error === "";
  };

  const validateLugar = (lugar: string) => {
    let error = "";
    if (!lugar) error = "El campo de lugar no puede estar vacío.";
    else if (lugar.length < 5) error = "El lugar debe tener al menos 5 letras.";
    else if (lugar.length > 30) error = "El lugar no puede tener más de 30 letras.";
    else {
      const lugarRegex = /^[A-Za-z0-9\s]+$/;
      if (!lugarRegex.test(lugar)) error = "El lugar no puede contener caracteres especiales.";
    }
    setErrors((prevErrors) => ({ ...prevErrors, lugar: error }));
    return error === "";
  };

  const validateDescripcion = (descripcion: string) => {
    let error = "";
    if (!descripcion) error = "El campo de descripción no puede estar vacío.";
    else if (descripcion.length < 5) error = "La descripción debe tener al menos 5 letras.";
    else if (descripcion.length > 150) error = "La descripción no puede tener más de 150 letras.";
    else {
      const descripcionRegex = /^[A-Za-z0-9\s]+$/;
      if (!descripcionRegex.test(descripcion)) error = "La descripción no puede contener caracteres especiales.";
    }
    setErrors((prevErrors) => ({ ...prevErrors, descripcion: error }));
    return error === "";
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImagenes(files);
    }
  };

  const handleSubmit = async () => {
    const isTituloValid = validateTitulo(titulo);
    const isLugarValid = validateLugar(lugar);
    const isDescripcionValid = validateDescripcion(descripcion);

    if (!isTituloValid || !isLugarValid || !isDescripcionValid) {
      return;
    }

    try {
      const res = await crearIncidencia(
        {
          ct_titulo: titulo,
          ct_descripcion: descripcion,
          ct_lugar: lugar,
        },
        imagenes
      );
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
    setImagenes([]);
    setErrors({ titulo: "", lugar: "", descripcion: "" });
  };

  return (
    <IonPage>
      <MenuIcon nombreUsuario={datos.nombre} />
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
                onIonBlur={() => validateTitulo(titulo)}
                clearInput
              />
            </IonItem>
            {errors.titulo && <p className="error-message">{errors.titulo}</p>}
            <IonItem>
              <IonInput
                label="Lugar"
                labelPlacement="floating"
                placeholder="Digite el lugar"
                value={lugar}
                onIonInput={(e) => setLugar(e.detail.value!)}
                onIonBlur={() => validateLugar(lugar)}
                clearInput
              />
            </IonItem>
            {errors.lugar && <p className="error-message">{errors.lugar}</p>}
            <IonItem>
              <IonTextarea
                label="Descripción"
                labelPlacement="floating"
                placeholder="Digite la descripcion"
                value={descripcion}
                onIonInput={(e) => setDescripcion(e.detail.value!)}
                onIonBlur={() => validateDescripcion(descripcion)}
                rows={5}
              />
            </IonItem>
            {errors.descripcion && <p className="error-message">{errors.descripcion}</p>}
            <IonItem>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                multiple
              />
              <IonIcon icon={cameraOutline} slot="start" />
              <IonLabel>Agregar Imágenes</IonLabel>
            </IonItem>
            <IonButton expand="block" onClick={handleSubmit}>
              Registrar
            </IonButton>
          </IonList>
          <IonToast
            isOpen={showToast}
            onDidDismiss={() => setShowToast(false)}
            message={toastMessage}
            duration={6000}
          />
        </form>
      </IonContent>
    </IonPage>
  );
};

export default CrearIncidencia;
