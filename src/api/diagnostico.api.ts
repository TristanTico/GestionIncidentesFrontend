import axiosInstance from "./axios";

interface Diagnostico {
  ct_descripcion: string;
  cn_tiempoSolucion: string;
  ct_observacion: string;
}

export const crearDiagnosticoRequest = async (
  ct_cod_incidencia: string,
  diagnostico: Diagnostico
) => {
  return await axiosInstance.post(
    `/crearDiagnostico/${ct_cod_incidencia}`,
    diagnostico
  );
};