// Dentro de ReporteCargaTrabajo component
import React, { useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonList,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
} from "@ionic/react";
import { useSgi } from "../context/sgiContext";
import { useAuth } from "../context/authContext";
import MenuIcon from "./MenuIcon";

// Define la interfaz para Categoria
interface Categoria {
  categoria: string;
  trabajoPendiente: any[]; // Ajusta el tipo según la estructura real
  trabajoTerminado: any[]; // Ajusta el tipo según la estructura real
  sumatoriaDuracionPendiente: number;
  sumatoriaDuracionTerminado: number;
}

const ReporteCargaTrabajo: React.FC = () => {
  const { getTokenPayload } = useAuth();
  const { getReporteCargas, reporteCargas } = useSgi();
  const datos = getTokenPayload();

  useEffect(() => {
    getReporteCargas();
  }, []);

  return (
    <>
      <MenuIcon nombreUsuario={datos.nombre} />
      <IonContent color="light">
        <div className="header-container">
          <IonTitle className="page-title">Cargas de trabajo</IonTitle>
        </div>
        <div className="divider"></div>
        
          {reporteCargas && reporteCargas.length > 0 ? (
            reporteCargas.map((reporte, index) => (
              <IonCard key={index}>
                <IonCardHeader>
                  <IonCardTitle>{reporte.usuario.nombre}</IonCardTitle>
                </IonCardHeader>
                {reporte.categorias.map((categoria: Categoria, catIndex: number) => (
                  <IonCardContent key={catIndex}>
                    <IonCardSubtitle>{categoria.categoria}</IonCardSubtitle>
                    <p style={{ fontWeight: "bold" }}>Trabajo Pendiente: {categoria.sumatoriaDuracionPendiente} h</p>
                    <p style={{ fontWeight: "bold" }}>Trabajo Terminado: {categoria.sumatoriaDuracionTerminado} h</p>
                  </IonCardContent>
                ))}
              </IonCard>
            ))
          ) : (
            <div>No hay reportes</div>
          )}
        
      </IonContent>
    </>
  );
};

export default ReporteCargaTrabajo;
