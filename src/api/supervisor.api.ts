import axiosInstance from "./axios";

export interface Justificacion {
  ct_justificacionDeCierre: string;
}

export const getIncidenciasTerminadasRequest = async () =>
  await axiosInstance.get("/getIncidenciasTerminadas");
export const actualizarEstadoAprobadoRequest = async (
  ct_cod_incidencia: string
) => {
  return await axiosInstance.put(
    `/actualizarEstadoAprobado/${ct_cod_incidencia}`
  );
};

export const actualizarEstadoRechazadoRequest = async (
  ct_cod_incidencia: string
) => {
  return await axiosInstance.put(
    `/actualizarEstadoRechazado/${ct_cod_incidencia}`
  );
};

export const actualizarEstadoCerradoRequest = async (
  ct_cod_incidencia: string,
  justificacion: Justificacion
) => {
  return await axiosInstance.put(
    `/actualizarEstadoCerrado/${ct_cod_incidencia}`,
    justificacion
  );
};
