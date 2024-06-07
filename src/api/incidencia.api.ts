import axiosInstance from "./axios";

interface Incidencia {
  ct_titulo: string;
  ct_descripcion: string;
  ct_lugar: string;
}

export const crearIncidenciaRequest = async (incidencia: Incidencia) => {
  return await axiosInstance.post("/crearIncidencia", incidencia);
};

export const getincidenciasXusuarioRequest = async () =>
  await axiosInstance.get("/getIncidenciasXusuario");

export const getIncidenciaRequest = async (ct_cod_incidencia: string) => {
  return await axiosInstance.get(`/getIncidencia/${ct_cod_incidencia}`);
};

export const getIncidenciasRegistradasRequest = async () =>
  await axiosInstance.get("/getIncidenciaRegistradas");

export const getIncidenciasAsignadasRequest = async () =>
  await axiosInstance.get("/getIncidenciasAsignadas");

export const actualizarEstadoRevisionRequest = async (ct_cod_incidencia : string) => {
  return await axiosInstance.put(`/actualizarEstadoRevision/${ct_cod_incidencia}`);
}

export const actualizarEstadoReparacionRequest = async (ct_cod_incidencia : string) => {
  return await axiosInstance.put(`/actualizarEstadoReparacion/${ct_cod_incidencia}`);
}