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
} from "@ionic/react";
import { useAuth } from "../context/authContext";
import "./ExploreContainer.css";
import { useHistory } from "react-router-dom";

const LoginComponent: React.FC = () => {
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const history = useHistory();

  const { signin } = useAuth();

  const handleLogin = async () => {
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
              <img src="/sgi2.png" alt="Login Image" className="login-image" />
              <IonCardTitle className="centrarTitulo">Login</IonCardTitle>
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
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Contraseña</IonLabel>
                  <IonInput
                    type="text"
                    placeholder="Ingrese su contraseña"
                    value={contraseña}
                    onIonInput={(e) => setContraseña(e.detail.value!)}
                  />
                </IonItem>
                <IonButton
                  expand="block"
                  className="ion-margin-top"
                  onClick={handleLogin}
                >
                  Login
                </IonButton>
                <IonToast
                  isOpen={showToast}
                  onDidDismiss={() => setShowToast(false)}
                  message={toastMessage}
                  duration={4000}
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
