import axiosInstance from "./axios";

interface Diagnostico {
  ct_descripcion: string;
  cn_tiempoSolucion: string;
  ct_observacion: string;
}

export const crearDiagnosticoRequest = async (
  ct_cod_incidencia: string,
  diagnostico: Diagnostico,
  imagenes: File[]
) => {
  const formData = new FormData();
  formData.append("ct_descripcion", diagnostico.ct_descripcion);
  formData.append("cn_tiempoSolucion", diagnostico.cn_tiempoSolucion);
  formData.append("ct_observacion", diagnostico.ct_observacion);

  // Agregar imágenes al FormData
  imagenes.forEach((imagen) => {
    formData.append("images", imagen);
  });

  return await axiosInstance.post(
    `/crearDiagnostico/${ct_cod_incidencia}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const getDiagnosticoRequest = async () => {
  return await axiosInstance.get(`/getDiagnosticos`);
};

export const actualizarEstadoTerminadoRequest = async (
  ct_cod_incidencia: string
) => {
  return await axiosInstance.put(
    `/actualizarEstadoTerminado/${ct_cod_incidencia}`
  );
};

export const getImagenXdiagnosticoRequest = async (
  cn_cod_diagnostico: any
) => {
  return await axiosInstance.get(
    `/getImagenesXdiagnostico/${cn_cod_diagnostico}`
  );
};