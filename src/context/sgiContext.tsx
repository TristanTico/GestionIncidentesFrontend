import React, {
  useEffect,
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";
import Cookies from "js-cookie";
import {
  crearIncidenciaRequest,
  getIncidenciaRequest,
  getincidenciasXusuarioRequest,
} from "../api/incidencia.api";

interface Incidencia {
  ct_titulo: string;
  ct_descripcion: string;
  ct_lugar: string;
  cd_fechaHora?: Date;
  ct_cod_incidencia?: string;
}

interface SgiContextProps {
  incidencias: Incidencia[] | null;
  crearIncidencia: (incidencia: Incidencia) => Promise<any>;
  getIncidenciaXusuario: () => void;
  getIncidencia: (ct_cod_incidencia: string) => Promise<any>;
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

  const getIncidenciaXusuario = async () => {
    try {
      const res = await getincidenciasXusuarioRequest();
      console.log(res.data);
      setIncidencia(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getIncidencia = async (ct_cod_incidencia: string): Promise<any> => {
    try {
      const res = await getIncidenciaRequest(ct_cod_incidencia);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SgiContext.Provider
      value={{
        incidencias,
        crearIncidencia,
        getIncidenciaXusuario,
        getIncidencia,
      }}
    >
      {children}
    </SgiContext.Provider>
  );
};

export default SgiContext;
