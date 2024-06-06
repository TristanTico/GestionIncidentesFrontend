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
