import {
  IonButtons,
  IonMenuButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Home.css";
import MenuIcon from "../components/MenuIcon";
import { useAuth } from "../context/authContext";

const Prueba1: React.FC = () => {
  const {nombrePrueba} = useAuth();
  return (
    <IonPage>
      <MenuIcon nombreUsuario={nombrePrueba}/>
      <IonContent fullscreen color="light"></IonContent>
    </IonPage>
  );
};

export default Prueba1;
