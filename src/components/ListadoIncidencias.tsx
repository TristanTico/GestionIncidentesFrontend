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
  IonSearchbar
} from "@ionic/react";
import { chevronForward } from "ionicons/icons";
import { useSgi } from "../context/sgiContext";
import { useAuth } from "../context/authContext";
import IncidenciaModal, { InciModal } from "./incidencias/IncidenciaModal";

import "./listado.css";
import MenuIcon from "./MenuIcon";

const ListadoIncidencias: React.FC = () => {
  const { getTokenPayload } = useAuth();
  const [selectedIncidencia, setSelectedIncidencia] =
    useState<InciModal | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const datos = getTokenPayload();

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
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  };

  // Ensure incidencias is not null
  const filteredIncidencias = (incidencias || []).filter((incidencia) => {
    return (
      incidencia.ct_titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incidencia.ct_lugar.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incidencia.ct_descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incidencia.t_estados.ct_descripcion.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <>
      <MenuIcon nombreUsuario={datos.nombre} />
      <IonContent color="light">
        <div className="header-container">
          <IonTitle className="page-title">Listado de Incidencias</IonTitle>
        </div>
        <div className="divider"></div>
        <IonSearchbar
          color="light"
          placeholder="Filtrar Incidencia"
          value={searchTerm}
          onIonInput={(e: any) => setSearchTerm(e.target.value)}
        ></IonSearchbar>
        <IonList inset={true}>
          {filteredIncidencias && filteredIncidencias.length > 0 ? (
            filteredIncidencias.map((incidencia, index) => (
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
        {selectedIncidencia && (
          <IncidenciaModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            inciModal={selectedIncidencia}
          />
        )}
      </IonContent>
    </>
  );
}
export default ListadoIncidencias;
