import React from 'react';
import { IonList, IonItem, IonSelect, IonSelectOption } from '@ionic/react';

interface ListaRolesProps {
  roles: string[];
}

const ListaRoles: React.FC<ListaRolesProps> = ({ roles }) => {
  return (
    <IonList >
      <IonItem>
        <IonSelect interface="popover" placeholder="Roles">
          {roles.map((rol, index) => (
            <IonSelectOption key={index} value={rol}>{rol}</IonSelectOption>
          ))}
        </IonSelect>
      </IonItem>
    </IonList>
  );
}

export default ListaRoles;
