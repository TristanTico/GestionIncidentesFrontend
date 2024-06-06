import { IonButtons, IonHeader, IonMenuButton, IonTitle, IonToolbar } from "@ionic/react";

interface MenuIconProps {
  nombreUsuario : string;
}

const MenuIcon: React.FC<MenuIconProps> = ({nombreUsuario}) => {
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