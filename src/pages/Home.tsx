import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton,
} from "@ionic/react";
import "./Home.css";
import { useAuth } from "../context/authContext";
import MenuIcon from "../components/MenuIcon";
import logoSGI from "../assets/sgi2.png";
import "./Home.css";

const Home: React.FC = () => {
  const { getTokenPayload } = useAuth();

  const datos = getTokenPayload();

  //<IonButton onClick={handleLogout}>Logout</IonButton>

  return (
    <IonPage>
      <MenuIcon nombreUsuario={datos.nombre} />
      <IonContent fullscreen color="light">
      <div className="welcome-container">
          <h1>Bienvenido, {datos.nombre}!</h1>
          <p>Esta es la página principal de tu sistema de gestión de incidentes.</p>
          <img src={logoSGI} alt="Welcome" className="welcome-image" />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
