import React, { useEffect, useState } from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonTitle,
  IonToolbar,
  IonList,
  IonSelect,
  IonSelectOption,
  IonChip,
  IonIcon,
  IonText,
} from "@ionic/react";
import { closeCircle, personCircleOutline } from "ionicons/icons"; // Importar el icono de usuario
import { useSgi } from "../context/sgiContext";

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  ct_cod_incidencia: any;
}

const ModalAsignacion: React.FC<FormModalProps> = ({
  isOpen,
  onClose,
  ct_cod_incidencia,
}) => {
  const { getTecnicos, tecnicos, asignarIncidencia, getIncidenciasRegistradas } = useSgi();
  const [tecnicosSeleccionados, setTecnicosSeleccionados] = useState<any[]>([]);
  const [tecnicoSeleccionado, setTecnicoSeleccionado] = useState<string>("");

  const [cn_costos, setCnCostos] = useState<number>(0);
  const [cn_duracion, setCnDuracion] = useState<number>(0);
  const [ct_prioridad, setCtPrioridad] = useState<string>("");
  const [ct_riesgo, setCtRiesgo] = useState<string>("");
  const [ct_afectacion, setCtAfectacion] = useState<string>("");
  const [ct_categoria, setCtCategoria] = useState<string>("");

  useEffect(() => {
    try {
      getTecnicos();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleTecnicoSelect = (event: CustomEvent) => {
    const selectedTecnico = event.detail.value;
    if (
      selectedTecnico &&
      !tecnicosSeleccionados.some(
        (tec) => tec.cn_cod_usuario === selectedTecnico
      )
    ) {
      const tecnico = tecnicos?.find(
        (tec: any) => tec.cn_cod_usuario === selectedTecnico
      );
      if (tecnico) {
        setTecnicosSeleccionados([...tecnicosSeleccionados, tecnico]);
        setTecnicoSeleccionado("");
      }
    }
  };

  const removeTecnico = (tecnico: any) => {
    const updatedTecnicos = tecnicosSeleccionados.filter(
      (tec) => tec.cn_cod_usuario !== tecnico.cn_cod_usuario
    );
    setTecnicosSeleccionados(updatedTecnicos);
  };

  const handleAsignar = async () => {
    const asignacionData = {
      cn_costos: cn_costos || 0,
      cn_duracion: cn_duracion || 0,
      ct_prioridad,
      ct_riesgo,
      ct_afectacion,
      ct_categoria,
      usuarios: tecnicosSeleccionados.map((tecnico) => ({
        cn_cod_usuario: tecnico.cn_cod_usuario,
        ct_correo: tecnico.ct_correo,
        ct_nombre: tecnico.ct_nombre,
      })),
    };

    try {
      const result = await asignarIncidencia(ct_cod_incidencia, asignacionData);
      getIncidenciasRegistradas();
      console.log("Asignación creada exitosamente", result);
      onClose();
    } catch (error) {
      console.error("Error al crear la asignación", error);
    }
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Asignar Incidencia</IonTitle>
          <IonButton slot="end" onClick={onClose} color="danger">
            Cerrar
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form>
          <IonList>
            <IonItem>
              <IonSelect
                value={tecnicoSeleccionado}
                onIonChange={handleTecnicoSelect}
                interface="popover"
                placeholder="Seleccione el Técnico"
              >
                {tecnicos &&
                  tecnicos.map((tecnico: any) => (
                    <IonSelectOption
                      key={tecnico.cn_cod_usuario}
                      value={tecnico.cn_cod_usuario}
                      disabled={tecnicosSeleccionados.some(
                        (tec) => tec.cn_cod_usuario === tecnico.cn_cod_usuario
                      )}
                    >
                      {tecnico.ct_nombre}
                    </IonSelectOption>
                  ))}
              </IonSelect>
            </IonItem>
            <IonItem>
              {tecnicosSeleccionados.length > 0 ? (
                tecnicosSeleccionados.map((tecnico: any) => (
                  <IonChip key={tecnico.cn_cod_usuario}>
                    <IonIcon icon={personCircleOutline} />{" "}
                    <IonLabel>{tecnico.ct_nombre}</IonLabel>
                    <IonIcon
                      icon={closeCircle}
                      onClick={() => removeTecnico(tecnico)}
                    />
                  </IonChip>
                ))
              ) : (
                <IonText color="medium">
                  Seleccione un técnico para asignar.
                </IonText>
              )}
            </IonItem>
            <IonItem>
              <IonSelect
                aria-label="Prioridad"
                interface="popover"
                placeholder="Seleccione la prioridad"
                value={ct_prioridad}
                onIonChange={(e) => setCtPrioridad(e.detail.value)}
              >
                <IonSelectOption value="Baja">Baja</IonSelectOption>
                <IonSelectOption value="Media">Media</IonSelectOption>
                <IonSelectOption value="Alta">Alta</IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonSelect
                aria-label="Riesgo"
                interface="popover"
                placeholder="Seleccione el riesgo"
                value={ct_riesgo}
                onIonChange={(e) => setCtRiesgo(e.detail.value)}
              >
                <IonSelectOption value="Bajo">Bajo</IonSelectOption>
                <IonSelectOption value="Medio">Medio</IonSelectOption>
                <IonSelectOption value="Alto">Alto</IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonSelect
                aria-label="Afectacion"
                interface="popover"
                placeholder="Seleccione la afectación"
                value={ct_afectacion}
                onIonChange={(e) => setCtAfectacion(e.detail.value)}
              >
                <IonSelectOption value="Bajo">Bajo</IonSelectOption>
                <IonSelectOption value="Medio">Medio</IonSelectOption>
                <IonSelectOption value="Alto">Alto</IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonSelect
                aria-label="Categoria"
                interface="popover"
                placeholder="Seleccione la categoría"
                value={ct_categoria}
                onIonChange={(e) => setCtCategoria(e.detail.value)}
              >
                <IonSelectOption value="Reparación">Reparación</IonSelectOption>
                <IonSelectOption value="Intervención por causa natural">
                  Intervención por causa natural
                </IonSelectOption>
                <IonSelectOption value="Atención al mobiliario">
                  Atención al mobiliario
                </IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonInput
                label="Costo"
                labelPlacement="floating"
                placeholder="Digite el Costo"
                clearInput
                type="number"
                value={cn_costos === 0 ? "" : cn_costos}
                onIonChange={(e) => setCnCostos(Number(e.detail.value))}
              />
            </IonItem>
            <IonItem>
              <IonInput
                label="Duracion"
                labelPlacement="floating"
                placeholder="Digite la duracion"
                clearInput
                type="number"
                value={cn_duracion === 0 ? "" : cn_duracion}
                onIonChange={(e) => setCnDuracion(Number(e.detail.value))}
              />
            </IonItem>
            <IonButton expand="block" onClick={handleAsignar}>
              Asignar
            </IonButton>
          </IonList>
        </form>
      </IonContent>
    </IonModal>
  );
};

export default ModalAsignacion;
