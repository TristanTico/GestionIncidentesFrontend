import axiosInstance from "./axios";

export interface Encargado {
  cn_costos: number;
  cn_duracion: number;
  ct_prioridad: string;
  ct_riesgo: string;
  ct_afectacion: string;
  ct_categoria: string;
  usuarios: any;
}

export const asignarIncidenciaRequest = async (
  ct_cod_incidencia: string,
  encargado: Encargado
) => {
  return await axiosInstance.post(
    `/asignarIncidencia/${ct_cod_incidencia}`,
    encargado
  );
};

export const getTecnicosRequest = async () => {
  return await axiosInstance.get("/getTecnicos");
};

export const getReporteCargaRequest = async () => {
  return await axiosInstance.get("/getReporteCargaTrabajo");
};
