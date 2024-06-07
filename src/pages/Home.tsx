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

const Home: React.FC = () => {
  const { getTokenPayload } = useAuth();

  const datos = getTokenPayload();

  //<IonButton onClick={handleLogout}>Logout</IonButton>

  return (
    <IonPage>
      <MenuIcon nombreUsuario={datos.nombre} />
      <IonContent fullscreen color="light"></IonContent>
    </IonPage>
  );
};

export default Home;
