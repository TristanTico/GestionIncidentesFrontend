import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonText,
  IonTitle,
} from "@ionic/react";
import { chevronForward } from "ionicons/icons";
import { useSgi } from "../context/sgiContext";
import { useAuth } from "../context/authContext";
import IncidenciaModal, { InciModal } from "./incidencias/IncidenciaModal";

import "./listado.css";
import MenuIcon from "./MenuIcon";

const ListadoIncidencias: React.FC = () => {
  const { nombrePrueba } = useAuth();
  const [selectedIncidencia, setSelectedIncidencia] =
    useState<InciModal | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { incidencias, getIncidenciaXusuario, getIncidencia } = useSgi();

  useEffect(() => {
    getIncidenciaXusuario();
  }, []);

  const getInci = async (ct_cod_incidencia: any) => {
    try {
      const res = await getIncidencia(ct_cod_incidencia);
      setSelectedIncidencia(res.data);
      setModalOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (dateString: any) => {
    if (!dateString) return "Fecha no disponible";
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <MenuIcon nombreUsuario={nombrePrueba} />
      <IonContent color="light">
        <div className="header-container">
          <IonTitle className="page-title">Listado de Incidencias</IonTitle>
        </div>
        <div className="divider"></div>
        <IonList inset={true}>
          {incidencias && incidencias.length > 0 ? (
            incidencias.map((incidencia, index) => (
              <IonItem
                button={true}
                detail={false}
                key={index}
                onClick={() => getInci(incidencia.ct_cod_incidencia)}
              >
                <div className="unread-indicator-wrapper" slot="start">
                  <div className="unread-indicator"></div>
                </div>
                <IonLabel>
                  <strong>{incidencia.ct_titulo}</strong>
                  <IonText>{incidencia.ct_lugar}</IonText>
                  <br />
                  <IonNote color="medium" className="ion-text-wrap">
                    {incidencia.ct_descripcion}
                  </IonNote>
                </IonLabel>
                <div className="metadata-end-wrapper" slot="end">
                  <IonNote color="medium">
                    {formatDate(incidencia.cd_fechaHora)}
                  </IonNote>
                  <IonIcon color="medium" icon={chevronForward}></IonIcon>
                </div>
              </IonItem>
            ))
          ) : (
            <div>No hay incidencias</div>
          )}
        </IonList>
        <IncidenciaModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          inciModal={selectedIncidencia}
        />
      </IonContent>
    </>
  );
}
export default ListadoIncidencias;
