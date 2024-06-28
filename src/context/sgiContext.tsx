import React, {
  useEffect,
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";
import {
  crearIncidenciaRequest,
  getIncidenciaRequest,
  getincidenciasXusuarioRequest,
  getIncidenciasRegistradasRequest,
  getIncidenciasAsignadasRequest,
  actualizarEstadoRevisionRequest,
  actualizarEstadoReparacionRequest,
  getImagenesIncidenciaRequest,
  getTablaImagenesRequest,
} from "../api/incidencia.api";

import {
  crearDiagnosticoRequest,
  getDiagnosticoRequest,
  actualizarEstadoTerminadoRequest,
  getImagenXdiagnosticoRequest,
} from "../api/diagnostico.api";

import {
  getTecnicosRequest,
  Encargado,
  asignarIncidenciaRequest,
  getReporteCargaRequest,
} from "../api/encargado.api";

import {
  actualizarEstadoAprobadoRequest,
  actualizarEstadoCerradoRequest,
  actualizarEstadoRechazadoRequest,
  getIncidenciasTerminadasRequest,
  Justificacion,
} from "../api/supervisor.api";

interface Incidencia {
  ct_titulo: string;
  ct_descripcion: string;
  ct_lugar: string;
  cd_fechaHora?: Date;
  ct_cod_incidencia?: string;
  cn_cod_estado?: number;
  t_estados?: {
    ct_descripcion: string;
  };
}

interface Diagnostico {
  ct_descripcion: string;
  cn_tiempoSolucion: string;
  ct_observacion: string;
}

interface SgiContextProps {
  incidencias: Incidencia[] | null;
  diagnosticos: Diagnostico[] | null;
  tecnicos: any[] | null;
  tecnicoDiagnostico: any[] | null;
  incidenciasTerminadas: any[] | null;
  incidenciasAsignadas: any[] | null;
  reporteCargas: any[] | null;
  imageUrls: any[] | null;
  getTecnicos: () => void;
  getReporteCargas: () => void;
  getDiagnosticos: () => void;
  getTablaImagenes: () => void;
  //crearIncidencia: (incidencia: Incidencia) => Promise<any>;
  crearIncidencia: (incidencia: Incidencia, imagenes: File[]) => Promise<any>;
  crearDiagnostico: (
    ct_cod_incidencia: string,
    diagnostico: Diagnostico,
    imagenes: File[]
  ) => Promise<any>;
  asignarIncidencia: (
    ct_cod_incidencia: string,
    encargado: Encargado
  ) => Promise<any>;
  actualizarEstadoCerrado: (
    ct_cod_incidencia: string,
    justificacion: Justificacion
  ) => Promise<any>;
  getIncidenciaXusuario: () => void;
  getIncidenciasRegistradas: () => void;
  getIncidenciasAsignadas: () => void;
  getIncidenciasTerminadas: () => void;
  getIncidencia: (ct_cod_incidencia: string) => Promise<any>;
  getImagenesIncidencia: (ct_cod_incidencia: string) => Promise<any>;
  getImagenXDiagnostico: (cn_cod_diagnostico: number) => Promise<any>;
  actualizarEstadoRevision: (ct_cod_incidencia: string) => Promise<any>;
  actualizarEstadoReparacion: (ct_cod_incidencia: string) => Promise<any>;
  actualizarEstadoTerminado: (ct_cod_incidencia: string) => Promise<any>;
  actualizarEstadoAprobado: (ct_cod_incidencia: string) => Promise<any>;
  actualizarEstadoRechazado: (ct_cod_incidencia: string) => Promise<any>;
}

interface SgiProviderProps {
  children: ReactNode;
}

const SgiContext = createContext<SgiContextProps | undefined>(undefined);

export const useSgi = (): SgiContextProps => {
  const context = useContext(SgiContext);
  if (!context) throw new Error("useAuth must be used within a AuthProvider");
  return context;
};

export const SgiProvider = ({ children }: SgiProviderProps): JSX.Element => {
  const [incidencias, setIncidencia] = useState<Incidencia[] | null>(null);
  const [diagnosticos, setDiagnosticos] = useState<Diagnostico[] | null>(null);
  const [tecnicos, setTecnicos] = useState<any[] | null>(null);
  const [tecnicoDiagnostico, setTecnicoDiagnostico] = useState<any[] | null>(
    null
  );
  const [incidenciasTerminadas, setIncidenciasTerminadas] = useState<
    any[] | null
  >(null);
  const [incidenciasAsignadas, setIncidenciasAsignadas] = useState<
    any[] | null
  >(null);
  const [imageUrls, setImageUrls] = useState<any[] | null>(null);
  const [reporteCargas, setReporteCargas] = useState<
    any[] | null
  >(null);

  /*
  const crearIncidencia = async (incidencias: Incidencia): Promise<any> => {
    try {
      const res = await crearIncidenciaRequest(incidencias);
      console.log(res);
      setIncidencia([res.data]);
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  */
  const crearIncidencia = async (
    incidencia: Incidencia,
    imagenes: File[]
  ): Promise<any> => {
    try {
      const res = await crearIncidenciaRequest(incidencia, imagenes);
      console.log(res);
      setIncidencia([res.data]);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const getIncidenciaXusuario = async () => {
    try {
      const res = await getincidenciasXusuarioRequest();
      console.log(res.data);
      setIncidencia(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTecnicos = async () => {
    try {
      const res = await getTecnicosRequest();
      console.log(res.data);
      setTecnicos(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getDiagnosticos = async () => {
    try {
      const res = await getDiagnosticoRequest();
      console.log(res.data);
      setTecnicoDiagnostico(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTablaImagenes = async () => {
    try {
      const res = await getTablaImagenesRequest();
      console.log(res.data);
      setImageUrls(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getImagenesIncidencia = async (
    ct_cod_incidencia: string
  ): Promise<any> => {
    try {
      const res = await getImagenesIncidenciaRequest(ct_cod_incidencia);
      console.log(res.data);
      return res;
    } catch (error) {
      throw error;
    }
  };

  const getImagenXDiagnostico = async (
    cn_cod_diagnostico: any
  ): Promise<any> => {
    try {
      const res = await getImagenXdiagnosticoRequest(cn_cod_diagnostico);
      console.log(res.data);
      return res;
    } catch (error) {
      throw error;
    }
  };

  const getIncidenciasTerminadas = async () => {
    try {
      const res = await getIncidenciasTerminadasRequest();
      console.log(res.data);
      setIncidenciasTerminadas(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getIncidenciasRegistradas = async () => {
    try {
      const res = await getIncidenciasRegistradasRequest();
      setIncidencia(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getIncidenciasAsignadas = async () => {
    try {
      const res = await getIncidenciasAsignadasRequest();
      setIncidenciasAsignadas(res.data);
      //console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const actualizarEstadoRevision = async (
    ct_cod_incidencia: string
  ): Promise<any> => {
    try {
      const res = await actualizarEstadoRevisionRequest(ct_cod_incidencia);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const actualizarEstadoAprobado = async (
    ct_cod_incidencia: string
  ): Promise<any> => {
    try {
      const res = await actualizarEstadoAprobadoRequest(ct_cod_incidencia);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const actualizarEstadoRechazado = async (
    ct_cod_incidencia: string
  ): Promise<any> => {
    try {
      const res = await actualizarEstadoRechazadoRequest(ct_cod_incidencia);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const actualizarEstadoCerrado = async (
    ct_cod_incidencia: string,
    justificacion: Justificacion
  ): Promise<any> => {
    try {
      const res = await actualizarEstadoCerradoRequest(
        ct_cod_incidencia,
        justificacion
      );
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const actualizarEstadoReparacion = async (
    ct_cod_incidencia: string
  ): Promise<any> => {
    try {
      const res = await actualizarEstadoReparacionRequest(ct_cod_incidencia);
      return res;
    } catch (error) {
      throw error;
    }
  };

  const actualizarEstadoTerminado = async (
    ct_cod_incidencia: string
  ): Promise<any> => {
    try {
      const res = await actualizarEstadoTerminadoRequest(ct_cod_incidencia);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const getIncidencia = async (ct_cod_incidencia: string): Promise<any> => {
    try {
      const res = await getIncidenciaRequest(ct_cod_incidencia);
      console.log(res.data);

      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const crearDiagnostico = async (
    ct_cod_incidencia: string,
    diagnostico: Diagnostico,
    imagenes: File[]
  ): Promise<any> => {
    try {
      const res = await crearDiagnosticoRequest(
        ct_cod_incidencia,
        diagnostico,
        imagenes
      );
      console.log(res);
      setDiagnosticos([res.data]);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const asignarIncidencia = async (
    ct_cod_incidencia: string,
    encargado: Encargado
  ): Promise<any> => {
    try {
      const res = await asignarIncidenciaRequest(ct_cod_incidencia, encargado);
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const getReporteCargas = async () => {
    try {
      const res = await getReporteCargaRequest();
      console.log(res.data);
      setReporteCargas(res.data);
    } catch (error) {
      throw error;
    }
  }

  return (
    <SgiContext.Provider
      value={{
        incidencias,
        diagnosticos,
        tecnicos,
        tecnicoDiagnostico,
        incidenciasTerminadas,
        incidenciasAsignadas,
        getTecnicos,
        getDiagnosticos,
        imageUrls,
        getTablaImagenes,
        crearIncidencia,
        getIncidenciaXusuario,
        getIncidenciasRegistradas,
        getIncidenciasTerminadas,
        getIncidencia,
        getImagenesIncidencia,
        getIncidenciasAsignadas,
        actualizarEstadoRevision,
        actualizarEstadoReparacion,
        actualizarEstadoTerminado,
        crearDiagnostico,
        asignarIncidencia,
        actualizarEstadoAprobado,
        actualizarEstadoRechazado,
        actualizarEstadoCerrado,
        getImagenXDiagnostico,
        reporteCargas,
        getReporteCargas,
      }}
    >
      {children}
    </SgiContext.Provider>
  );
};

export default SgiContext;
