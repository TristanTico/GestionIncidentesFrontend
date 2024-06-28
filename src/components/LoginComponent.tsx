import React, { useState } from "react";
import {
  IonContent,
  IonPage,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonToast,
  IonText,
} from "@ionic/react";
import { useAuth } from "../context/authContext";
import "./ExploreContainer.css";
import { useHistory } from "react-router-dom";
import logoSGI from "../assets/sgi2.png";
import "./listado.css";

const LoginComponent: React.FC = () => {
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [errors, setErrors] = useState({ correo: "", contraseña: "" });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const history = useHistory();

  const { signin } = useAuth();

  const validateCorreo = (correo: any) => {
    if (!correo) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        correo: "El campo de correo no puede estar vacío.",
      }));
      return false;
    }
    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correoRegex.test(correo)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        correo: "Ingrese un correo válido.",
      }));
      return false;
    }
    setErrors((prevErrors) => ({ ...prevErrors, correo: "" }));
    return true;
  };

  const validateContraseña = (contraseña: any) => {
    if (!contraseña) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        contraseña: "El campo de contraseña no puede estar vacío.",
      }));
      return false;
    }
    const contraseñaRegex = /^[A-Za-z\d*]*$/;
    if (!contraseñaRegex.test(contraseña)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        contraseña:
          "La contraseña solo puede contener letras, dígitos y el caracter '*'.",
      }));
      return false;
    }
    setErrors((prevErrors) => ({ ...prevErrors, contraseña: "" }));
    return true;
  };

  const handleLogin = async () => {
    const isCorreoValid = validateCorreo(correo);
    const isContraseñaValid = validateContraseña(contraseña);

    if (!isCorreoValid || !isContraseñaValid) {
      return;
    }

    try {
      const res = await signin({ ct_correo: correo, ct_clave: contraseña });
      if (res.status === 200) {
        setToastMessage(res.data.message);
        setShowToast(true);
        console.log(res.data.message);
        setTimeout(() => {
          history.push("/home");
        }, 700);
      }
    } catch (error) {
      setToastMessage(
        "Usuario o Contraseña incorrecto. Verifique sus credenciales."
      );
      setShowToast(true);
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding" color="light">
        <div className="login-container">
          <IonCard className="login-card">
            <IonCardHeader>
              <img src={logoSGI} alt="Login Image" className="login-image" />
              <IonText color="secondary" style={{ textAlign: 'center' }}>
                <h2>¡Bienvenido de vuelta!</h2>
              </IonText>
              <IonCardTitle className="centrarTitulo">
                Inicia sesión en tu cuenta
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <form>
                <IonItem>
                  <IonLabel position="stacked">Correo</IonLabel>
                  <IonInput
                    type="email"
                    placeholder="Ingrese su correo"
                    value={correo}
                    onIonInput={(e) => setCorreo(e.detail.value!)}
                    onIonBlur={() => validateCorreo(correo)}
                  />
                </IonItem>
                {errors.correo && (
                  <p className="error-message">{errors.correo}</p>
                )}
                <IonItem>
                  <IonLabel position="stacked">Contraseña</IonLabel>
                  <IonInput
                    type="text"
                    placeholder="Ingrese su contraseña"
                    value={contraseña}
                    onIonInput={(e) => setContraseña(e.detail.value!)}
                    onIonBlur={() => validateContraseña(contraseña)}
                  />
                </IonItem>
                {errors.contraseña && (
                  <p className="error-message">{errors.contraseña}</p>
                )}
                <IonButton
                  expand="block"
                  className="ion-margin-top"
                  onClick={handleLogin}
                >
                  Iniciar sesión
                </IonButton>
                <IonToast
                  isOpen={showToast}
                  onDidDismiss={() => setShowToast(false)}
                  message={toastMessage}
                  duration={4000}
                  color="success"
                />
              </form>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoginComponent;
