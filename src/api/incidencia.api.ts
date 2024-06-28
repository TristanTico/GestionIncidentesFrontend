import axiosInstance from "./axios";

interface Incidencia {
  ct_titulo: string;
  ct_descripcion: string;
  ct_lugar: string;
}

export const crearIncidenciaRequest = async (
  incidencia: Incidencia,
  imagenes: File[]
) => {
  const formData = new FormData();
  formData.append("ct_titulo", incidencia.ct_titulo);
  formData.append("ct_descripcion", incidencia.ct_descripcion);
  formData.append("ct_lugar", incidencia.ct_lugar);
  
  // Agregar imágenes al FormData
  imagenes.forEach((imagen) => {
    formData.append("images", imagen);
  });

  return await axiosInstance.post("/crearIncidencia", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

/*
export const crearIncidenciaRequest = async (incidencia: Incidencia) => {
  return await axiosInstance.post("/crearIncidencia", incidencia);
};
*/

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

export const getImagenesIncidenciaRequest = async (ct_cod_incidencia : string) => {
  return await axiosInstance.get(`/getImagenesIncidencia/${ct_cod_incidencia}`);
}

export const getTablaImagenesRequest = async () => await axiosInstance.get("/getTablaImagenes");