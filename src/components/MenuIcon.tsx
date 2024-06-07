import { IonButtons, IonHeader, IonMenuButton, IonTitle, IonToolbar } from "@ionic/react";
import { useAuth } from "../context/authContext";
import ListaRoles from "./ListaRoles";

interface MenuIconProps {
  nombreUsuario : string;
}

const MenuIcon: React.FC<MenuIconProps> = ({nombreUsuario}) => {
  const {getTokenPayload} = useAuth();
  const datos = getTokenPayload();
  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons>
          <IonMenuButton />
        </IonButtons>
        <IonTitle slot="end"><strong>{nombreUsuario}</strong></IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default MenuIcon;