import React, { useState } from "react";
import {
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
  IonIcon,
} from "@ionic/react";
import {
  chevronForwardCircle,
  document,
  colorPalette,
  globe,
  addCircleOutline,
} from "ionicons/icons";
import ModalIncidencias from "./ModalIncidencias";

function Floating() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <IonFab slot="fixed" vertical="top" horizontal="start">
        <IonFabButton>
          <IonIcon icon={chevronForwardCircle} />
        </IonFabButton>
        <IonFabList side="end">
          <IonFabButton onClick={handleOpenModal}>
            <IonIcon icon={addCircleOutline} />
          </IonFabButton>
        </IonFabList>
      </IonFab>
      <ModalIncidencias isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
}

export default Floating;
